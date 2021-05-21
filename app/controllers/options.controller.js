const db = require("../models");
const Options = db.options;
const Op = db.Sequelize.Op;

var sanitizeHtml = require("sanitize-html");


// Create and Save a new Options
exports.create = (req, res) => {
  // Validate request
  if (false) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  // Save Options in the database
  Options.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the options."
      });
    });
};

// Retrieve all Options from the database.
exports.findAll = (req, res) => {
  
  Options.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Options."
      });
    });
};

// Find a single Options with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Options.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Options with id=" + id
      });
    });
};

// Update a Options by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  console.log(req.body);


  req.body.home_text = sanitizeHtml(req.body.home_text);
  req.body.footer_text_1 = sanitizeHtml(req.body.footer_text_1);
  req.body.footer_text_2 = sanitizeHtml(req.body.footer_text_2);

  Options.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success:true,
          message: "Options were updated successfully."
        });
      } else {
        res.send({
          success:false,
          message: `Cannot update Options with id=${id}. Maybe Options was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        success:false,
        message: "Error updating Options with id=" + id
      });
    });
};

// Delete an Options with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Options.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        
        res.send({
          message: "Options was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Options with id=${id}. Maybe Options was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Options with id=" + id
      });
    });

  
};

exports.deleteAll = (req, res) => {
  Options.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Options were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Options."
      });
    });
};


