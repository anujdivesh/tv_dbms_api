module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define("country", {
    short_name: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false, // Disallow null values
    validate: {
      notEmpty: true, // Ensure the value is not an empty string
    }
    },
    long_name: {
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

  return Country;
};
