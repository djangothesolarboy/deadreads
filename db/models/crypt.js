'use strict';
module.exports = (sequelize, DataTypes) => {
  const Crypt = sequelize.define('Crypt', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Crypt.associate = function(models) {
    const columnMapping = {
      through: 'CryptJoinBook',
      otherKey: 'bookId',
      foreignKey: 'cryptId'
    }

    Crypt.belongsToMany(models.Book, columnMapping);
  };
  return Crypt;
};
