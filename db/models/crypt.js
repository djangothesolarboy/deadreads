'use strict';
module.exports = (sequelize, DataTypes) => {
  const Crypt = sequelize.define('Crypt', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Crypt.associate = function(models) {
    // associations can be defined here
  };
  return Crypt;
};