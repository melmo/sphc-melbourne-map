const { authJwt, verifyUserData } = require("../middleware");
const users = require("../controllers/user.controller");
const auth = require("../controllers/auth.controller");

module.exports = app => {
  var router = require("express").Router();

  // Create a new User
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin, verifyUserData.checkForNoBlanks, verifyUserData.checkDuplicateUsernameOrEmail], auth.signup);

  // Retrieve all Users
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], users.findAll);

  // Retrieve a single User with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isAdminOrSelf], users.findOne); // isAdminOrSelf

  // Update a User with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdminOrSelf, verifyUserData.checkForNoBlanksUpdate, verifyUserData.checkDuplicateUsernameOrEmailUpdate], users.update);  // isAdminOrSelf

  // Delete a User with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.delete);

  // Delete all Users
  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], users.deleteAll);

  app.use('/api/users', router);


  /*

  app.get("/api/restricted/all", users.allAccess);

  app.get(
    "/api/restricted/user",
    [authJwt.verifyToken],
    users.userBoard
  );

  app.get(
    "/api/restricted/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    users.moderatorBoard
  );

  app.get(
    "/api/restricted/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    users.adminBoard
  );

  */

  
};


