
const { authJwt } = require("../middleware");
const controller = require("../controllers/country.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
    const country = require("../controllers/country.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", country.findAll);
  
    app.use('/ocean_api/api/countries', router);

    app.post(
      "/ocean_api/api/country/add",[authJwt.verifyToken, authJwt.isAdmin],
      controller.findOrCreate,
    );
    app.get(
      "/ocean_api/api/country/:short_name",
      controller.findOne
    );
    app.put(
      "/ocean_api/api/country/:short_name",[authJwt.verifyToken, authJwt.isAdmin],
      controller.update
    );
    app.delete(
      "/ocean_api/api/country/:short_name",[authJwt.verifyToken, authJwt.isAdmin],
      controller.destroy
    );
  };