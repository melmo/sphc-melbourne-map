require('dotenv').config();
const express = require("express");
const path = __dirname + '/app/views/';
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

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


// for production
//db.sequelize.sync();

/*
For development - drop all data and initialise roles

*/

const Role = db.role;
const User = db.user;
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial();
});



// simple route
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// send requests to index file for react to handle loading correct page
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

require("./app/routes/location.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  User.create({
    username:"test",
    email:"test@test.com",
    password:bcrypt.hashSync("testtesttest", 8),
    roleId:3

  });
}