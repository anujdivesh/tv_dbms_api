
const { authJwt } = require("../middleware");
const controller = require("../controllers/metadata.controller");
module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
    const metadata = require("../controllers/metadata.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", metadata.findAll);
  
    app.use('/ocean_api/api/metadata', router);

    app.post(
      "/ocean_api/api/metadata/add",[authJwt.verifyToken, authJwt.isAdmin],
      controller.create
    );

    app.get(
        "/ocean_api/api/metadata/:id",
        controller.findOne
      );

      app.put(
        "/ocean_api/api/metadata/:id",[authJwt.verifyToken, authJwt.isAdmin],
        controller.update
      );
  };