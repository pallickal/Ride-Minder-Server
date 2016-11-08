'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vehicle = sequelize.define('Vehicle', {
    year: DataTypes.INTEGER,
    make: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: DataTypes.STRING,
    trim: DataTypes.STRING,
    body_style: DataTypes.STRING,
    color: DataTypes.STRING,
    vin: DataTypes.STRING,
    miles: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models['Vehicle'].belongsTo(models['Person']);
      }
    }
  });
  return Vehicle;
};
