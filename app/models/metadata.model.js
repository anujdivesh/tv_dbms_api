module.exports = (sequelize, Sequelize) => {
    const MetaData = sequelize.define("metadata", {
      title: {
        type: Sequelize.STRING,
      },
      abstract: {
        type: Sequelize.STRING
      },
      data_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensure the value is not an empty string
        }
      },
      comment: {
        type: Sequelize.STRING,
      },
      temporal_coverage_from: {
        type: Sequelize.DATE
      },
      temporal_coverage_to: {
        type: Sequelize.DATE
      },
      language: {
        type: Sequelize.STRING,
        defaultValue:"en"
      },
      version: {
        type: Sequelize.STRING,
        default:"v1.0."
      },
      project_id:{
        type: Sequelize.INTEGER,
        notNull: true,
      },
      west_bounding_box: {
        type: Sequelize.DOUBLE,
      },
      east_bounding_box: {
        type: Sequelize.DOUBLE,
      },
      south_bounding_box: {
        type: Sequelize.DOUBLE,
      },
      north_bounding_box: {
        type: Sequelize.DOUBLE,
      },
      coordinate_reference_system: {
        type: Sequelize.STRING,
      },
      contact_id: {
        type: Sequelize.INTEGER,
      },
      publisher_id: {
        type: Sequelize.INTEGER,
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      country_id: {
        type: Sequelize.STRING,
      },
      access_constraint: {
        type: Sequelize.STRING,
      },
      license: {
        type: Sequelize.STRING,
      },
      acknowledgement: {
        type: Sequelize.STRING,
      },
      history: {
        type: Sequelize.STRING,
      },
      funding: {
        type: Sequelize.STRING,
      },
      references: {
        type: Sequelize.STRING,
      },
      is_restricted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    has_fileupload: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
   },
   canonical_url: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
    });
  
    return MetaData;
  };
  