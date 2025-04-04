
const { authJwt } = require("../middleware/index.js");
const controller = require("../controllers/data_type.controller.js");
module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    const datatype = require("../controllers/data_type.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", datatype.findAll);
  
    app.use('/ocean_api/api/data_type', router);

    app.post(
      "/ocean_api/api/data_type/add",[authJwt.verifyToken, authJwt.isAdmin],
      controller.findOrCreate
    );
    app.get(
      "/ocean_api/api/data_type/:id",
      controller.findOne
    );
    app.put(
      "/ocean_api/api/data_type/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.update
    );
    app.delete(
      "/ocean_api/api/data_type/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.destroy
    );
  };