const { authJwt } = require("../middleware");
const controller = require("../controllers/dataset.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get list of all files with metadata
  app.get("/ocean_api/api/dataset", controller.getListFiles);

  // Download a specific file by ID
  app.get("/ocean_api/api/dataset/:id", controller.download);

  // Upload a new file
  app.post("/ocean_api/api/dataset", controller.upload);

  // Delete a file by ID (async version)
  app.delete("/ocean_api/api/dataset/:id", controller.remove);

  // Optionally keep the sync version if needed (though recommended to use async)
  // app.delete("/ocean_api/api/dataset/sync/:id", controller.removeSync);
};