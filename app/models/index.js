const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.country = require("../models/country.model.js")(sequelize, Sequelize);
db.data_type = require("../models/data_type.model.js")(sequelize, Sequelize);
db.project = require("../models/project.model.js")(sequelize, Sequelize);
db.contact = require("../models/contact.model.js")(sequelize, Sequelize);
db.publisher = require("../models/publisher.model.js")(sequelize, Sequelize);
db.keyword = require("../models/keyword.model.js")(sequelize, Sequelize);
db.topic = require("../models/topic.model.js")(sequelize, Sequelize);
db.metadata = require("../models/metadata.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


db.refreshToken.belongsTo(db.user, {
  foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
  foreignKey: 'userId', targetKey: 'id'
});

db.country.hasOne(db.user, {foreignKey: 'country_id'});
db.user.belongsTo(db.country, {foreignKey: 'country_id'});


//One to one relations
db.data_type.hasOne(db.metadata, {foreignKey: 'data_type_id'});
db.metadata.belongsTo(db.data_type, {foreignKey: 'data_type_id'});

db.project.hasOne(db.metadata, {foreignKey: 'project_id'});
db.metadata.belongsTo(db.project, {foreignKey: 'project_id'});

db.contact.hasOne(db.metadata, {foreignKey: 'contact_id'});
db.metadata.belongsTo(db.contact, {foreignKey: 'contact_id'});

db.publisher.hasOne(db.metadata, {foreignKey: 'publisher_id'});
db.metadata.belongsTo(db.publisher, {foreignKey: 'publisher_id'});

db.country.hasOne(db.metadata, {foreignKey: 'country_id'});
db.metadata.belongsTo(db.country, {foreignKey: 'country_id'});

//Many to many relationship
db.topic.belongsToMany(db.metadata, {
  through: "metadata_topic",
  foreignKey: "topic_id",
  otherKey: "metadata_id"
});
db.metadata.belongsToMany(db.topic, {
  through: "metadata_topic",
  foreignKey: "metadata_id",
  otherKey: "topic_id"
});


db.metadata.belongsToMany(db.keyword, {
  through: "metadata_keyword",
  foreignKey: "keyword_id",
  otherKey: "metadata_id"
});
db.keyword.belongsToMany(db.metadata, {
  through: "metadata_keyword",
  foreignKey: "keyword_id",   // This should point to keyword
  otherKey: "metadata_id"     // This should point to metadata
});


db.ROLES = ["user", "admineyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6Im", "registered"];

module.exports = db;