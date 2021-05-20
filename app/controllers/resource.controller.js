const db = require("../models");
const Resource = db.resource;
const Op = db.Sequelize.Op;
const aws = require('aws-sdk');


// Create and Save a new Resource
exports.create = (req, res) => {
  // Validate request
  if (false) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log(req.body);
  console.log(req.files);

  // Create a Resource

  var resource = {};

  if (req.files.length == 1) {
      resource.url = req.files[0].location;
      resource.s3key = req.files[0].key;
      resource.name = req.body.name;
      resource.description = req.body.description;
      resource.locationId = req.body.locationId;
  } else {
      resource.url = req.body.url;
      resource.name = req.body.name;
      resource.description = req.body.description;
      resource.locationId = req.body.locationId;
  }

  // Save Resource in the database
  Resource.create(resource)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Resource."
      });
    });
};

// Retrieve all Resources from the database.
exports.findAll = (req, res) => {
  
  

  Resource.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving resources."
      });
    });
};

// Find a single Resource with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Resource.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Resource with id=" + id
      });
    });
};

// Update an Resource by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  

  Resource.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success:true,
          message: "Resource was updated successfully."
        });
      } else {
        res.send({
          success:false,
          message: `Cannot update Resource with id=${id}. Maybe Resource was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        success:false,
        message: "Error updating Resource with id=" + id
      });
    });
};

// Delete an Resource with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Resource.findByPk(id)
    .then(data => {

      if (data.s3key) {
        aws.config.update({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
          region: 'ap-southeast-2'
        });

        const s3 = new aws.S3({
          apiVersion: "2006-03-01"
        });

        let params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: data.s3key
        };

        s3.deleteObject(params, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            
            Resource.destroy({
              where: { id: id }
            })
              .then(num => {
                if (num == 1) {
                  
                  res.send({
                    message: "Resource was deleted successfully!"
                  });
                } else {
                  res.send({
                    message: `Cannot delete Resource with id=${id}. Maybe Resource was not found!`
                  });
                }
              })
              .catch(err => {
                res.status(500).send({
                  message: "Could not delete Resource with id=" + id
                });
              });
          }
        });

        } else {

    Resource.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          
          res.send({
            message: "Resource was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Resource with id=${id}. Maybe Resource was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Resource with id=" + id
        });
      });

  }


      
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Resource with id=" + id
      });
    });

  
};

exports.deleteAll = (req, res) => {
  Resource.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Resources were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Resources."
      });
    });
};


// Find all Resources for a given location
exports.findAllByLocation = (req, res) => {
  const id = req.params.id;
  Resource.findAll({ where: { locationId: id }, order : [[ "id" , "ASC"]] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Resources."
      });
    });
};



