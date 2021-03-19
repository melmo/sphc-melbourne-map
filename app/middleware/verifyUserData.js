const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Op = db.Sequelize.Op;

checkForNoBlanks = (req, res, next) => {
  if (!req.body.user.username || !req.body.user.password || !req.body.user.email || !req.body.user.role ) {
    res.send({
      success : false,
      message: "Username, email, password, and role are all required fields."
    });
    return;
  }
  next();
}

checkForNoBlanksUpdate = (req, res, next) => {
  
  if (!req.body.user.username || !req.body.user.email || !req.body.user.roleId ) {
    res.send({
      success : false,
      message: "Username, email, and role are all required fields."
    });
    return;
  }
  next();
}

checkDuplicateUsernameOrEmail = (req, res, next) => {
  
  // Username
  User.findOne({
    where: {
      username: req.body.user.username
    }
  }).then(user => {
    if (user) {
      res.send({
        success : false,
        message: "Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.user.email
      }
    }).then(user => {
      if (user) {
        res.send({
          success : false,
          message: "Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkDuplicateUsernameOrEmailUpdate = (req, res, next) => {
  console.log(req.body);
  // Username
  User.findOne({
    where: {
      username: req.body.user.username,
      id: {
        [Op.ne]: req.body.user.id
      }
    }
  }).then(user => {
    if (user) {
      res.send({
        success : false,
        message: "Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.user.email,
        id: {
          [Op.ne]: req.body.user.id
        }
      }
    }).then(user => {
      if (user) {
        res.send({
          success : false,
          message: "Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};



const verifyUserData = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkForNoBlanks:checkForNoBlanks,
  checkForNoBlanksUpdate:checkForNoBlanksUpdate,
  checkDuplicateUsernameOrEmailUpdate:checkDuplicateUsernameOrEmailUpdate
};

module.exports = verifyUserData;