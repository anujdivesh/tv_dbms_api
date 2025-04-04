const db = require("../models");
const MetaData = db.metadata;
const DataType = db.data_type;
const Project = db.project;
const Contact = db.contact;
const Publisher = db.publisher;
const Country = db.country;
const Topic = db.topic;
const Keyword = db.keyword;
const Op = db.Sequelize.Op;

// Create and Save a new Metadata
exports.create = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    
    try {
      // Validate required fields
      if (!req.body.title || !req.body.data_type_id || !req.body.project_id) {
        await transaction.rollback();
        return res.status(400).send({
          message: "Title, data_type_id and project_id are required fields!"
        });
      }
  
      // Check for existing metadata with same title, data_type_id and project_id
      const existingMetadata = await MetaData.findOne({
        where: {
          title: req.body.title,
          data_type_id: req.body.data_type_id,
          project_id: req.body.project_id
        },
        transaction
      });
  
      if (existingMetadata) {
        await transaction.rollback();
        return res.status(409).send({
          message: "Metadata with this title, data type and project already exists",
          existingId: existingMetadata.id
        });
      }
  
      // Create Metadata
      const metadata = {
        title: req.body.title,
        abstract: req.body.abstract,
        data_type_id: req.body.data_type_id,
        project_id: req.body.project_id,
        // ... other fields ...
      };
  
      // Save Metadata
      const createdMetadata = await MetaData.create(metadata, { transaction });
  
      // Handle associations
      if (req.body.topic_ids || req.body.topic_id) {
        const topicIds = req.body.topic_ids || [req.body.topic_id].filter(Boolean);
        const topics = await Topic.findAll({
          where: { id: topicIds },
          transaction
        });
        
        if (topics.length !== topicIds.length) {
          await transaction.rollback();
          return res.status(400).send({
            message: "One or more topic IDs are invalid"
          });
        }
        await createdMetadata.addTopics(topics, { transaction });
      }
  
      if (req.body.keyword_ids || req.body.keyword_id) {
        const keywordIds = req.body.keyword_ids || [req.body.keyword_id].filter(Boolean);
        const keywords = await Keyword.findAll({
          where: { id: keywordIds },
          transaction
        });
        
        if (keywords.length !== keywordIds.length) {
          await transaction.rollback();
          return res.status(400).send({
            message: "One or more keyword IDs are invalid"
          });
        }
        await createdMetadata.addKeywords(keywords, { transaction });
      }
  
      // Commit transaction
      await transaction.commit();
  
      res.status(201).send({
        message: "Metadata created successfully"
      });
  
    } catch (err) {
      await transaction.rollback();
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Metadata."
      });
    }
  };

// Retrieve all Metadata from the database
exports.findAll = async (req, res) => {
  const { title, data_type_id, project_id } = req.query;
  const condition = {};

  if (title) {
    condition.title = { [Op.iLike]: `%${title}%` };
  }
  if (data_type_id) {
    condition.data_type_id = data_type_id;
  }
  if (project_id) {
    condition.project_id = project_id;
  }

  try {
    const data = await MetaData.findAll({
      where: condition,
      include: [
        { model: DataType },
        { model: Project },
        { model: Contact },
        { model: Publisher },
        { model: Country },
        { model: Topic },
        { model: Keyword }
      ]
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving metadata."
    });
  }
};

// Find a single Metadata with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await MetaData.findByPk(id, {
      include: [
        { model: DataType },
        { model: Project },
        { model: Contact },
        { model: Publisher },
        { model: Country },
        { model: Topic },
        { model: Keyword }
      ]
    });

    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Metadata with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Metadata with id=" + id
    });
  }
};

// Update a Metadata by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await MetaData.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      // Handle many-to-many relationships if provided
      const metadata = await MetaData.findByPk(id);
      
      if (req.body.topic_ids) {
        await metadata.setTopics(req.body.topic_ids);
      }

      if (req.body.keyword_ids) {
        await metadata.setKeywords(req.body.keyword_ids);
      }

      // Fetch the updated record with associations
      const result = await MetaData.findByPk(id, {
        include: [
          { model: DataType },
          { model: Project },
          { model: Contact },
          { model: Publisher },
          { model: Country },
          { model: Topic },
          { model: Keyword }
        ]
      });

      res.send(result);
    } else {
      res.send({
        message: `Cannot update Metadata with id=${id}. Maybe Metadata was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Metadata with id=" + id
    });
  }
};

// Delete a Metadata with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    // First remove the many-to-many associations
    const metadata = await MetaData.findByPk(id);
    if (metadata) {
      await metadata.setTopics([]);
      await metadata.setKeywords([]);
    }

    const num = await MetaData.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.send({
        message: "Metadata was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Metadata with id=${id}. Maybe Metadata was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Metadata with id=" + id
    });
  }
};

// Delete all Metadata from the database
exports.deleteAll = async (req, res) => {
  try {
    // First remove all many-to-many associations
    const allMetadata = await MetaData.findAll();
    for (const metadata of allMetadata) {
      await metadata.setTopics([]);
      await metadata.setKeywords([]);
    }

    const nums = await MetaData.destroy({
      where: {},
      truncate: false
    });

    res.send({ message: `${nums} Metadata records were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all metadata."
    });
  }
};

// Find all restricted Metadata
exports.findAllRestricted = async (req, res) => {
  try {
    const data = await MetaData.findAll({ 
      where: { is_restricted: true },
      include: [
        { model: DataType },
        { model: Project },
        { model: Contact },
        { model: Publisher },
        { model: Country },
        { model: Topic },
        { model: Keyword }
      ]
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving restricted metadata."
    });
  }
};