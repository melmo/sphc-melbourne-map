require('dotenv').config();
const express = require("express");
const path = __dirname + '/app/views/';
const bodyParser = require("body-parser");
const cors = require("cors");
const enforce = require('express-sslify');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}


var bcrypt = require("bcryptjs");

// css etc files and react files
app.use(express.static(path));

var corsOptions = {
  origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// css etc files and react files
app.use(express.static(path));

const db = require("./app/models");


if (process.env.DROP_DATA === 'true') {

/*
For development - drop all data and initialise roles
*/


db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial(db);
});

} else {
  // for production
  db.sequelize.sync({alter:process.env.ALTER_TABLES});

}





// simple route
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});



app.get('/add', function(req, res) {
  res.sendFile(path + "index.html", function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.get('/locations*', function(req, res) {
  res.sendFile(path + "index.html", function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.get('/map*', function(req, res) {
  res.sendFile(path + "index.html", function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});


require("./app/routes/location.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/image.routes')(app);
require('./app/routes/resident.routes')(app);
require('./app/routes/resource.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/options.routes')(app);

// send requests to index file for react to handle loading correct page
app.get('/*', function(req, res) {
  res.sendFile(path + "index.html", function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial(db) {
  db.role.create({
    id: 1,
    name: "user"
  });
 
  db.role.create({
    id: 2,
    name: "moderator"
  });
 
  db.role.create({
    id: 3,
    name: "admin"
  });

  db.user.create({
    username:"test",
    email:"test@test.com",
    password:bcrypt.hashSync("testtesttest", 8),
    roleId:3

  });
  db.options.create({
    home_heading : 'Public Housing Watch Victoria'
  });
}