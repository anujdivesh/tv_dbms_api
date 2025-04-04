const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/ocean_api/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/ocean_api/api/auth/signin", controller.signin);

  app.post("/ocean_api/api/auth/refreshtoken", controller.refreshToken);
  app.post("/ocean_api/api/auth/forgotpassword", controller.forgotPassword);
  app.get("/ocean_api/api/auth/resetPassword/:id/:token", controller.resetPassword);
  app.post("/ocean_api/api/auth/resetPassword/:id/:token", controller.resetPasswordpost);
  app.post("/ocean_api/api/auth/addRoleeyJhbGciOiJIUzI1NiIsInR5cC", controller.findOrCreateRole);
  app.get("/ocean_api/api/auth/findeyJhbGciOiJIUzI1NiIsInR5cC", controller.findAllRole);
  app.post("/ocean_api/api/auth/logout", controller.destroyRefresh);
};