const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;

  User.findAll({ where: condition, attributes: ['username', 'email',"roleId", "id"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findOne({ where : { id : id}, attributes: ['username', 'email',"roleId", "id"]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};


// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (req.body.updatePassword) {
    req.body.user.password = bcrypt.hashSync(req.body.user.password, 8);
  }

  if (req.body.permissions !== "admin") {
    delete req.body.user.roleId;
  }

  User.update(req.body.user, {
    where: { id: id },
    returning:true
  })
    .then((result) => {
      if (result[0] === 1) {
        
        res.send({
          user : {
            username : result[1][0].get().username,
            email : result[1][0].get().email,
          },
          success:true,
          message: "User was updated successfully."
        });
      } else {
        res.send({
          success:false,
          message: `Cannot update User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.send({
        success:false,
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};