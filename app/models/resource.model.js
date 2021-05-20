module.exports = (sequelize, Sequelize) => {
  const Resource = sequelize.define("resource", {
    url: {
      type: Sequelize.STRING
    },
    s3key: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    }
  });

  return Resource;
};