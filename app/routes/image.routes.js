const { authJwt, verifyLocationData, fileStorage } = require("../middleware");
const images = require("../controllers/image.controller.js");


module.exports = app => {
  
  var router = require("express").Router();

  // Create a new Image
  router.post("/", [authJwt.verifyToken, fileStorage.saveImageS3], images.create);

  // Retrieve all Images
  router.get("/", [authJwt.verifyToken], images.findAll);

  // Retrieve all Images for a given location
  router.get("/location/:id",  [authJwt.isLoggedIn,verifyLocationData.checkLocationPublished], images.findAllByLocation);

  // Retrieve a single Image with id 
  router.get("/:id", [authJwt.verifyToken], images.findOne);

  // Update an Image with id
  router.put("/:id", [authJwt.verifyToken], images.update);

  // Delete an Image with id
  router.delete("/:id", [authJwt.verifyToken], images.delete);

  app.use('/api/images',  router);
};