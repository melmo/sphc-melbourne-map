module.exports = (sequelize, Sequelize) => {
  const Options = sequelize.define("options", {
    home_heading: {
      type: Sequelize.STRING
    },
    home_text: {
      type: Sequelize.TEXT
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

  return Options;
};