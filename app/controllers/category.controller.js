const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;
var slugify = require("slugify");


// Create and Save a new Resident
exports.create = (req, res) => {
  // Validate request
  if (false) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  

  // Create a Category
  const category = {
    name: req.body.name,
    color: req.body.color,
    slug: slugify(req.body.name, {lower:true}),
  };

  // Save Category in the database
  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    });
};

// Retrieve all Resdients from the database.
exports.findAll = (req, res) => {
  
  Category.findAll()
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

// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + id
      });
    });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const category = {
    name: req.body.name,
    color:req.body.color,
    slug: slugify(req.body.name, {lower:true}),
  };

  Category.update(category, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success:true,
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          success:false,
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        success:false,
        message: "Error updating Category with id=" + id
      });
    });
};

// Delete an Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });

  
};

exports.deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Categories were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Categories."
      });
    });
};



