'use strict';
module.exports = (sequelize, DataTypes) => {
  const CryptJoinBook = sequelize.define('CryptJoinBook', {
    cryptId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  CryptJoinBook.associate = function(models) {
    // associations can be defined here
  };
  return CryptJoinBook;
};