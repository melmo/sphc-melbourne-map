const db = require("../models");
const Image = db.image;
const Op = db.Sequelize.Op;
const aws = require('aws-sdk');


// Create and Save a new Image
exports.create = (req, res) => {
  // Validate request
  if (false) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  // Create an Image
  const image = {
    caption: req.body.caption,
    copyright: req.body.copyright,
    locationId:req.body.locationId,
    url:req.file.location,
    s3key:req.file.key
  };

  // Save Image in the database
  Image.create(image)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Image."
      });
    });
};

// Retrieve all Images from the database.
exports.findAll = (req, res) => {
  
  

  Image.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving images."
      });
    });
};

// Find a single Image with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Image.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Image with id=" + id
      });
    });
};

// Update an Image by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  

  Image.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success:true,
          message: "Image was updated successfully."
        });
      } else {
        res.send({
          success:false,
          message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        success:false,
        message: "Error updating Image with id=" + id
      });
    });
};

// Delete an Image with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Image.findByPk(id)
    .then(data => {
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
          
          Image.destroy({
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                
                res.send({
                  message: "Image was deleted successfully!"
                });
              } else {
                res.send({
                  message: `Cannot delete Image with id=${id}. Maybe Image was not found!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Could not delete Image with id=" + id
              });
            });
        }
      });

      
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Image with id=" + id
      });
    });

  
};

exports.deleteAll = (req, res) => {
  Image.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Images were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Images."
      });
    });
};


// Find all Images for a given location
exports.findAllByLocation = (req, res) => {
  const id = req.params.id;
  Image.findAll({ where: { locationId: id }, order : [[ "id" , "ASC"]] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Images."
      });
    });
};



