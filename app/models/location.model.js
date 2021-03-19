module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("location", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    latitude:{
      type: Sequelize.FLOAT
    },
    longitude:{
      type: Sequelize.FLOAT
    }
  });

  return Location;
};