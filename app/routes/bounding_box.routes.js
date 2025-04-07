
const { authJwt } = require("../middleware");
const controller = require("../controllers/bounding_box.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
    const bounding_box = require("../controllers/bounding_box.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", bounding_box.findAll);
  
    app.use('/ocean_api/api/bounding_box', router);

    app.post(
      "/ocean_api/api/bounding_box/add",[authJwt.verifyToken, authJwt.isAdmin],
      controller.findOrCreate,
    );
    app.get(
      "/ocean_api/api/bounding_box/:id",
      controller.findOne
    );
    app.put(
      "/ocean_api/api/bounding_box/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.update
    );
    app.delete(
      "/ocean_api/api/bounding_box/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.destroy
    );
  };