const db = require("../models");
const config = require("../config/auth.config");
const Publisher = db.publisher;

const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    
  Publisher.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Publishers."
      });
    });
};

exports.findOrCreate = (req, res) => {
  return Publisher.findOrCreate({
    where:{
        name:{[Op.like] :req.body.name}
    },
    defaults:{
      name: req.body.name,
      website: req.body.website
    }
  })
    .then(data => {
      if (!data) {
        return res.status(500).send({ message: "Params cannot be empty." });
      }
      if (data[1]==true){
        res.status(200).send({message:'Publisher Created.'})
      }
      else{
        res.status(200).send({message:'Publisher Exists.'})
      }
  })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
      
    });
};

exports.findOne = (req, res) => {

  const countryId = req.params.id;
  return Publisher.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Publisher not found." });
      }
      else{
        res.status(200).send(countryId);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
    });
    
};

exports.update = async(req, res) => {
  try{
  const countryId = req.params.id;
  const org = await Publisher.findByPk(countryId);

  if (!org) {
    return res.status(200).json({ message: 'Publisher not found' });
  }
  else{

    //project.short_name = req.body.short_name,
    if (req.body.name != null){
    org.name = req.body.name
    }
    if (req.body.website != null){
      org.website = req.body.website
      }
  await org.save();

  res.status(200).send({ message: "Publisher updated successfully!" });
  }
}
catch(err){
  res.status(500).json({ message: 'Please pass in all the required paramters.' });
}
};

exports.destroy = (req,res) => {
  const countryId = req.params.id;
  return Publisher.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Publisher Not found." });
      }
      else{
        Publisher.destroy({where:{id:req.params.id}});
        res.status(200).send({ message: "Publisher deleted!" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An Error Occurred."+err });
    });
};