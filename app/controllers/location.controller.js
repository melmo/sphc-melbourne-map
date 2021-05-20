const db = require("../models");
const Location = db.location;
const Image = db.image;
const Op = db.Sequelize.Op;
var slugify = require("slugify");
var sanitizeHtml = require("sanitize-html");

// Create and Save a new Location
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Location
  const location = {
    title: req.body.title,
    description: req.body.description,
    slug : slugify(req.body.title, {lower:true}),
    published: req.body.published ? req.body.published : false,
    authorId:req.body.authorId
  };

  // Save Location in the database
  Location.create(location)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Location."
      });
    });
};

// Retrieve all Locations from the database.
exports.findAll = (req, res) => {
  /*const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;*/
  var condition = {};
  const title = req.query.title;
  if (title) {
    condition.title = { [Op.iLike]: `%${title}%` };
  }
  /*
  const slug = req.query.slug;
  if (slug) {
    condition.slug = { [Op.iLike]: `%${slug}%` };
  }
  */
  

  Location.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locations."
      });
    });
};

// Find a single Location with an id
exports.findOne = (req, res) => {

  console.log("req.params.id");
  console.log(req.params.id);
  const id = req.params.id;
  var where = {
     id: id
   };
  if (req.userId === 0) {
    where.published = true;
  }

  Location.findOne({ where: where })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Location with id=" + id
      });
    });
};



// Update a Location by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.permissions.canChangeOwner) {
    delete req.body.authorId;
  }

  req.body.slug = slugify(req.body.slug, {lower:true});
  req.body.history = sanitizeHtml(req.body.history);

  Location.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success:true,
          message: "Location was updated successfully."
        });
      } else {
        res.send({
          success:false,
          message: `Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        success:false,
        message: "Error updating Location with id=" + id
      });
    });
};

// Delete a Location with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  //TODO select all images that have this location id, delete from database and s3
  //https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObjects.html
  //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObjects-property

  Location.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Location was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Location with id=${id}. Maybe Location was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Location with id=" + id
      });
    });
};

// Delete all Locations from the database.
exports.deleteAll = (req, res) => {
  Location.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Locations were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Locations."
      });
    });
};

// Find all published Locations
exports.findAllPublished = (req, res) => {
  Location.findAll({ where: { published: true },
    include: [{
        model: Image,
        required : false,
        where: {},
        as:'images'
    }]
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Locations."
      });
    });
};

// Find one published Location
exports.findOnePublished = (req, res) => {
  Location.findAll({ 
    where: { published: true , id : req.params.id} ,
    include: [{
        model: Image,
        required : false,
        where: {},
        as:'images'
    }]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Location."
      });
    });
};

// Find all Locations by a given author
exports.findAllByAuthor = (req, res) => {
  const id = req.params.id;
  Location.findAll({ where: { authorId: id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Locations."
      });
    });
};

// Find a single Location by slug
exports.findBySlug = (req, res) => {
  const slug = req.params.slug;
  var where = {
     slug: slug
   };
  if (req.userId === 0) {
    where.published = true;
  }
  Location.findOne({ where: where })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Location."
      });
    });
};

