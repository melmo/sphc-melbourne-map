const { authJwt, verifyLocationData } = require("../middleware");
const locations = require("../controllers/location.controller.js");

module.exports = app => {
  
  var router = require("express").Router();

  // Create a new Location
  router.post("/", [authJwt.verifyToken], locations.create);

  // Retrieve all Locations
  router.get("/", [authJwt.verifyToken], locations.findAll);

  // Retrieve all published Locations
  router.get("/published", locations.findAllPublished);

  // Retrieve a single published Location
  router.get("/published/:id", locations.findOnePublished);

  // Retrieve all Locations by a given author
  router.get("/author/:id",  [authJwt.verifyToken], locations.findAllByAuthor);

  // Retrieve a single Location with id
  router.get("/:id", [authJwt.isLoggedIn], locations.findOne);

  // Retrieve a single Location with slug
  router.get("/slug/:slug", authJwt.isLoggedIn, locations.findBySlug);

  // Update a Location with id
  router.put("/:id", [authJwt.verifyToken, verifyLocationData.checkUpdatePermissions], locations.update);

  // Delete a Location with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], locations.delete);

  // Delete all Locations
  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], locations.deleteAll);

  app.use('/api/locations',  router);
};