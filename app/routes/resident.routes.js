const { authJwt, verifyLocationData} = require("../middleware");
const residents = require("../controllers/resident.controller.js");


module.exports = app => {
  
  var router = require("express").Router();

  // Create a new Resident
  router.post("/", [authJwt.verifyToken], residents.create);

  // Retrieve all Residents
  router.get("/", [authJwt.verifyToken], residents.findAll);

  // Retrieve all Residents for a given location
  router.get("/location/:id",  [authJwt.isLoggedIn,verifyLocationData.checkLocationPublished], residents.findAllByLocation);

  // Retrieve a single Resident with id
  router.get("/:id", [authJwt.verifyToken], residents.findOne);

  // Update an Resident with id
  router.put("/:id", [authJwt.verifyToken], residents.update);

  // Delete an Resident with id
  router.delete("/:id", [authJwt.verifyToken], residents.delete);

  app.use('/api/residents',  router);
};