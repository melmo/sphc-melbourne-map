module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define("image", {
    url: {
      type: Sequelize.STRING
    },
    s3key: {
      type: Sequelize.STRING
    },
    caption: {
      type: Sequelize.TEXT
    },
    copyright: {
      type: Sequelize.TEXT
    }
  });

  return Image;
};