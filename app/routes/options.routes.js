const { authJwt, verifyLocationData} = require("../middleware");
const options = require("../controllers/options.controller.js");


module.exports = app => {
  
  var router = require("express").Router();

  // Create a new Options set
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], options.create);

  // Retrieve all Options sets
  router.get("/",  options.findAll);

  // Retrieve a single Options set with id
  router.get("/:id",  options.findOne);

  // Update an Options set with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], options.update);

  // Delete an Options set with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], options.delete);

  app.use('/api/options',  router);
};