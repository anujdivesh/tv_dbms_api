
const { authJwt } = require("../middleware");
const controller = require("../controllers/contact.controller");

module.exports = app => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
    const contact = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", contact.findAll);
  
    app.use('/ocean_api/api/contacts', router);

    app.post(
      "/ocean_api/api/contact/add",[authJwt.verifyToken, authJwt.isAdmin],
      controller.findOrCreate
    );
    app.get(
      "/ocean_api/api/contact/:id",
      controller.findOne
    );
    app.put(
      "/ocean_api/api/contact/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.update
    );
    app.delete(
      "/ocean_api/api/contact/:id",[authJwt.verifyToken, authJwt.isAdmin],
      controller.destroy
    );
   
  };