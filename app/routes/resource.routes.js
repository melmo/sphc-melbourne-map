const { authJwt, verifyLocationData, fileStorage } = require("../middleware");
const resources = require("../controllers/resource.controller.js");


module.exports = app => {
  
  var router = require("express").Router();

  // Create a new Resource
  router.post("/", [authJwt.verifyToken, fileStorage.saveFileS3], resources.create);

  // Retrieve all Resources
  router.get("/", [authJwt.verifyToken], resources.findAll);

  // Retrieve all Resources for a given location
  router.get("/location/:id",  [ authJwt.isLoggedIn, verifyLocationData.checkLocationPublished], resources.findAllByLocation);

  // Retrieve a single Resource with id
  router.get("/:id", [authJwt.verifyToken], resources.findOne);

  // Update an Resource with id
  router.put("/:id", [authJwt.verifyToken], resources.update);

  // Delete an Resource with id
  router.delete("/:id", [authJwt.verifyToken], resources.delete);

  app.use('/api/resources',  router);
};