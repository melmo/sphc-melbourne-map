const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Op = db.Sequelize.Op;


checkUpdatePermissions = (req, res, next) => {
  
  User.findByPk(req.userId).then(user => {
    user.getRole().then(role => {
      
        if (role.name === "moderator" || role.name === "admin") {
          req.body.permissions = {
    		  	canUpdate : true,
    		  	canChangeOwner : true
    		  };
          next();
          return;
        }

        if (user.id == req.body.authorId) {
          req.body.permissions = {
            canUpdate : true,
            canChangeOwner : false
          };
          next();
          return;
        }

      res.send({
        success:false,
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};



const verifyLocationData = {
  checkUpdatePermissions: checkUpdatePermissions
};

module.exports = verifyLocationData;