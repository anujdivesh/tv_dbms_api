
const { authJwt } = require("../middleware");
const controller = require("../controllers/project.controller");
module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
    const project = require("../controllers/project.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", project.findAll);
  
    app.use('/ocean_api/api/projects', router);

    app.post(
      "/ocean_api/api/project/add",[authJwt.verifyToken, authJwt.isAdmin],
      controller.findOrCreate
    );
    app.get(
      "/ocean_api/api/project/:id",
      controller.findOne
    );
    app.put(
      "/ocean_api/api/project/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.update
    );
    app.delete(
      "/ocean_api/api/project/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.destroy
    );
  };