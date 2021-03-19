const db = require("../models");
const User = db.user;
const Role = db.role;
const nodemailer = require("nodemailer");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// create reusable transporter object using the default SMTP transport


let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
});

exports.signup = (req, res) => {
  
  // Save User to Database
  User.create({
    username: req.body.user.username,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 8),
    roleId:req.body.user.role
  })
    .then(user => {
        res.send({ 
          success : true,
          user : user,
          message: "User was registered successfully!" 
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }


      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRole().then(role => {
        
        authorities.push("ROLE_" + role.name.toUpperCase());
        
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.requestToken = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var token = jwt.sign({ id: user.id }, user.password + '-' + user.createdAt, {
      expiresIn: 86400 // 24 hours
    });

   

    // send mail with defined transport object
    transporter.sendMail({
      from: '"Save Public Housing Collective" <'+process.env.SMTP_USER+'>', // sender address
      to: user.email, // list of receivers
      subject: "You requested a password reset", // Subject line
      text: process.env.DOMAIN + '/reset-password/' + user.id + '/' + token, // plain text body
      html: '<b><a href="' + process.env.DOMAIN + '/reset-password/' + user.id + '/' + token + '">Reset password</a></b>', // html body
    }).then(info => {
      console.log("Message sent: %s", info.messageId);

      // Preview only available when sending through an Ethereal account
     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.send({
        message:"A reset password email has been sent to your email address."
      });

    }).catch(err => {
      res.status(500).send({ message: err.message });
    });

  
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.checkToken = (req, res) => {
  User.findOne({
    where: {
      id: req.body.id
    }
  }).then(user => {

    jwt.verify(req.body.token, user.password + '-' + user.createdAt, (err, verifiedJwt) => {
      if(err){
        res.send({
          success:false,
          message : err.message
        });
      }else{
        res.send({ 
          success:true,
          message: "Enter your new password." 
        });
      }
    });

  }).catch(err => {
    res.send({ 
      success:false,
      message: err.message 
    });
  });
};


exports.resetPassword = (req, res) => {
  console.log(req);
  User.findOne({
    where: {
      id: req.body.id
    }
  }).then(user => {

    jwt.verify(req.body.token, user.password + '-' + user.createdAt, (err, verifiedJwt) => {
      if(err){
        res.send({
          success:false,
          message : err.message
        });
      }else{
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        User.update({
          password : req.body.password
        },{
          where: { id: req.body.id },
          returning:true
        }).then(result => {
          res.send({ 
            success:true,
            message: "Password updated. You can now log in." 
          });
        }).catch(err => {
          res.send({
            success:false,
            message: "Error updating password."
          });
        });
        
      }
    });


    
  }).catch(err => {
    res.send({ 
      success:false,
      message: err.message 
    });
  });
};