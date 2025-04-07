module.exports = (sequelize, Sequelize) => {
    const Bounding_Box = sequelize.define("bounding_box", {
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Disallow null values
      validate: {
        notEmpty: true, // Ensure the value is not an empty string
      }
      },
      west_bound_longitude: {
        type: Sequelize.STRING
      },
      east_bound_longitude: {
        type: Sequelize.STRING
      },
      south_bound_latitude: {
        type: Sequelize.STRING
      },
      north_bound_latitude: {
        type: Sequelize.STRING
      },
      crs: {
        type: Sequelize.STRING
      }
    });
  
    return Bounding_Box;
  };
  