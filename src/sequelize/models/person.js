'use strict';
module.exports = function (sequelize, DataTypes) {
  var Person = sequelize.define('Person', {
    handle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        models['Person'].hasMany(models['Vehicle'], {onDelete: 'cascade'});
      }
    }
  });
  return Person;
};
