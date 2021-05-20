const db = require("../models");
const Resident = db.resident;
const Op = db.Sequelize.Op;


// Create and Save a new Resident
exports.create = (req, res) => {
  // Validate request
  if (false) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  

  // Create a Resident
  const resident = {
    name: req.body.name,
    story: req.body.story,
    locationId:req.body.locationId
  };

  // Save Resident in the database
  Resident.create(resident)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the resident."
      });
    });
};

// Retrieve all Residents from the database.
exports.findAll = (req, res) => {
  
  Resident.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving residents."
      });
    });
};

// Find a single Resident with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Resident.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Resident with id=" + id
      });
    });
};

// Update a Resident by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Resident.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success:true,
          message: "Resident was updated successfully."
        });
      } else {
        res.send({
          success:false,
          message: `Cannot update Resident with id=${id}. Maybe Resident was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        success:false,
        message: "Error updating Resident with id=" + id
      });
    });
};

// Delete an Resident with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Resident.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        
        res.send({
          message: "Resident was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Resident with id=${id}. Maybe Resident was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Resident with id=" + id
      });
    });

  
};

exports.deleteAll = (req, res) => {
  Resident.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Residents were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Residents."
      });
    });
};


// Find all Residents for a given location
exports.findAllByLocation = (req, res) => {
  const id = req.params.id;
  Resident.findAll({ where: { locationId: id }, order : [[ "id" , "ASC"]] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Residents."
      });
    });
};



