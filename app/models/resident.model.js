module.exports = (sequelize, Sequelize) => {
  const Resident = sequelize.define("resident", {
    name: {
      type: Sequelize.STRING
    },
    story: {
      type: Sequelize.TEXT
    }
  });

  return Resident;
};