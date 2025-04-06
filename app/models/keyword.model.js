module.exports = (sequelize, Sequelize) => {
    const Keyword = sequelize.define("keyword", {
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Disallow null values
      validate: {
        notEmpty: true, // Ensure the value is not an empty string
      }
      }
    });  
    return Keyword;
  };
  