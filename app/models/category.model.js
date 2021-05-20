module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
  });

  return Category;
};