const Sequelize = require("sequelize"); 
const sllSettings = process.env.NODE_ENV != "development" ? { require:true, rejectUnauthorized:false} : false;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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

db.user.hasMany(db.location, { foreignKey: "authorId", as: "locations" });
db.location.belongsTo(db.user, {
  foreignKey: "authorId",
  as: "author",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;