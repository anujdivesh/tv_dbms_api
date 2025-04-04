
const { authJwt } = require("../middleware");
const controller = require("../controllers/publisher.controller");
module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  const publisher = require("../controllers/publisher.controller.js");

  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/", publisher.findAll);

  app.use('/ocean_api/api/publishers', router);


  app.post(
    "/ocean_api/api/publisher/add",[authJwt.verifyToken, authJwt.isAdmin],
    controller.findOrCreate
  );
  app.get(
    "/ocean_api/api/publisher/:id",
    controller.findOne
  );
  app.put(
    "/ocean_api/api/publisher/:id",[authJwt.verifyToken, authJwt.isAdmin],
    controller.update
  );
  app.delete(
    "/ocean_api/api/publisher/:id",[authJwt.verifyToken, authJwt.isAdmin],
    controller.destroy
  );
};