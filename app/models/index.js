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
db.image = require("../models/image.model.js")(sequelize, Sequelize);
db.resident = require("../models/resident.model.js")(sequelize, Sequelize);
db.resource = require("../models/resource.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.options = require("../models/options.model.js")(sequelize, Sequelize);

db.location.hasMany(db.image, {as : "images", onDelete: 'cascade', hooks:true });
db.image.belongsTo(db.location, {
  foreignKey : "locationId",
  as:"location"
});

db.location.hasMany(db.resident, {as : "residents", onDelete: 'cascade', hooks:true });
db.resident.belongsTo(db.location, {
  foreignKey : "locationId",
  as:"location"
});

db.location.hasMany(db.resource, {as : "resources", onDelete: 'cascade', hooks:true });
db.resource.belongsTo(db.location, {
  foreignKey : "locationId",
  as:"location"
});


db.category.hasMany(db.location, { foreignKey: "categoryId", as: "locations" });
db.location.belongsTo(db.category, {
  foreignKey: "categoryId",
  as: "category",
});


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