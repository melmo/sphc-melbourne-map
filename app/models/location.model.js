module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("location", {
    title: {
      type: Sequelize.STRING
    },
    slug: {
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
    },
    description: {
      type: Sequelize.TEXT
    },
    introduction : {
      type: Sequelize.TEXT
    },
    history : {
      type: Sequelize.TEXT
    },
    youtube_id : {
      type: Sequelize.TEXT
    },
    lead_image : {
      type: Sequelize.INTEGER
    },
    call_to_action_text : {
      type: Sequelize.TEXT
    },
    call_to_action_link: {
      type: Sequelize.STRING
    },
    call_to_action_button: {
      type: Sequelize.STRING
    }
  });

  return Location;
};