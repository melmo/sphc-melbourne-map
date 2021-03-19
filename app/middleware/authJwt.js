const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      
      if (role.name === "admin") {
        req.body.permissions = "admin";
        next();
        return;
      }
      

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isAdminOrSelf = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      
      if (role.name === "admin") {
        req.body.permissions = "admin";
        next();
        return;
      }

      if (req.userId == req.params.id && req.baseUrl === "/api/users") { 
        next();
        return;
      }
      

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      
      if (role.name === "moderator") {
        next();
        return;
      }
      

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      
        if (role.name === "moderator") {
          next();
          return;
        }

        if (role.name === "admin") {
          next();
          return;
        }
      

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAdminOrSelf: isAdminOrSelf,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;