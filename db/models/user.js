'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    // cryptId: DataTypes.INTEGER,
    birthdate: DataTypes.DATE,
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Crypt, { foreignKey: 'userId' });
  };
  return User;
};
