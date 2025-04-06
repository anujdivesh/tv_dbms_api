
const { authJwt } = require("../middleware");
const controller = require("../controllers/topic.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    const topic = require("../controllers/topic.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", topic.findAll);
  
    app.use('/ocean_api/api/topics', router);

    app.post(
      "/ocean_api/api/topic/add",[authJwt.verifyToken, authJwt.isAdmin],
      controller.findOrCreate
    );
    app.get(
      "/ocean_api/api/topic/:id",
      controller.findOne
    );
    app.put(
      "/ocean_api/api/topic/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.update
    );
    app.delete(
      "/ocean_api/api/topic/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.destroy
    );
  };