const db = require("../models");
const config = require("../config/auth.config");
const Country = db.country;

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
      short_name:req.body.short_name
    },
    defaults:{
      short_name: req.body.short_name,
      long_name: req.body.long_name,
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

  const countryId = req.params.short_name
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
  const countryId = req.params.short_name
  return Country.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Country Not found." });
      }
      else{
        Country.update(
          {
            long_name: req.body.long_name,
            west_bound_longitude: req.body.west_bound_longitude,
            east_bound_longitude: req.body.east_bound_longitude,
            south_bound_latitude: req.body.south_bound_latitude,
            north_bound_latitude: req.body.north_bound_latitude,
            crs: req.body.crs
        },{
          where:{
            short_name: req.params.short_name,
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
  const countryId = req.params.short_name
  console.log(countryId)
  return Country.findByPk(countryId)
    .then((countryId) => {
      if (!countryId) {
        return res.status(200).send({ message: "Country Not found." });
      }
      else{
        Country.destroy({where:{short_name:req.params.short_name}});
        res.status(200).send({ message: "Country deleted!" });
      }
    })
    .catch((err) => {
      res.status(404).send({ message: "An Error Occurred."+err });
    });
};