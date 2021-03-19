const Sequelize = require("sequelize"); 
const sllSettings = process.env.NODE_ENV != "development" ? { require:true, rejectUnauthorized:false} : false;

//const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  //host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: sllSettings
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.location = require("../models/location.model.js")(sequelize, Sequelize);

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);


db.role.hasMany(db.user, { as: "users" });
db.user.belongsTo(db.role, {
  foreignKey: "roleId",
  as: "role",
});

db.user.hasMany(db.location, { as: "locations" });
db.location.belongsTo(db.user, {
  foreignKey: "authorId",
  as: "author",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;