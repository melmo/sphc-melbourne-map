const { verifyUserData } = require("../middleware");
const auth = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signin", auth.signin);
  app.post("/api/auth/request-token", auth.requestToken);
  app.post("/api/auth/check-token", auth.checkToken);
  app.post("/api/auth/reset-password", auth.resetPassword);
};