
const { authJwt } = require("../middleware");
const controller = require("../controllers/keyword.controller");
module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
    const keyword = require("../controllers/keyword.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", keyword.findAll);
  
    app.use('/ocean_api/api/keywords', router);

    app.post(
      "/ocean_api/api/keyword/add",[authJwt.verifyToken, authJwt.isAdmin],
      controller.findOrCreate
    );
    app.get(
      "/ocean_api/api/keyword/:id",
      controller.findOne
    );
    app.put(
      "/ocean_api/api/keyword/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.update
    );
    app.delete(
      "/ocean_api/api/keyword/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.destroy
    );
  };