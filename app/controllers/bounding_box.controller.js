const db = require("../models");
const config = require("../config/auth.config");
const Country = db.bounding_box;

const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    
    Country.findAll()
    .then(data => {
      if( data.length==0){
        res.status(200).send({message:'Empty'})
      }
      else{
        res.status(200).send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving countries."
      });
    });
};

exports.findOrCreate = (req, res) => {
  return Country.findOrCreate({
    where:{
      name:req.body.name
    },
    defaults:{
      name: req.body.name,
      west_bound_longitude: req.body.west_bound_longitude,
      east_bound_longitude: req.body.east_bound_longitude,
      south_bound_latitude: req.body.south_bound_latitude,
      north_bound_latitude: req.body.north_bound_latitude,
      crs: req.body.crs
    }
  })
    .then(data => {
      if (!data) {
        return res.status(200).send({ message: "Params cannot be empty." });
      }
      if (data[1]==true){
        res.status(200).send({message:'Country Created.'})
      }
      else{
        res.status(200).send({message:'Country Exists.'})
      }
  })
    .catch((err) => {
      res.status(404).send({ message: "An Error Occurred."+err });
      
    });
};

exports.findOne = (req, res) => {

  const countryId = req.params.id
  return Country.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Country Not found." });
      }
      else{
        res.status(200).send(countryId);
      }
    })
    .catch((err) => {
      res.status(404).send({ message: "An Error Occurred."+err });
    });
    
};

exports.update = (req, res) => {
  const countryId = req.params.id
  return Country.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Country Not found." });
      }
      else{
        Country.update(
          {
            name: req.body.name,
            west_bound_longitude: req.body.west_bound_longitude,
            east_bound_longitude: req.body.east_bound_longitude,
            south_bound_latitude: req.body.south_bound_latitude,
            north_bound_latitude: req.body.north_bound_latitude,
            crs: req.body.crs
        },{
          where:{
            id: req.params.id,
          }
        })
          .then(data => {
            console.log(data)
            if (data == 1){
              res.status(200).send({message:'Country updated.'})
            }
            else{
              res.status(200).send({message:'Country does not exist.'})
            }
        })
      }
    })
    .catch((err) => {
      res.status(404).send({ message: "An Error Occurred."+err });
    });

};

exports.destroy = (req,res) => {
  const countryId = req.params.id
  console.log(countryId)
  return Country.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Country Not found." });
      }
      else{
        Country.destroy({where:{id:req.params.id}});
        res.status(200).send({ message: "Country deleted!" });
      }
    })
    .catch((err) => {
      res.status(404).send({ message: "An Error Occurred."+err });
    });
};