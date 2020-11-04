'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    publisher: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    tagId: DataTypes.INTEGER,
    coverArt: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    const columnMapping = {
      through: 'CryptJoinBook',
      foreignKey: 'bookId',
      otherKey: 'cryptId'
    }

    Book.belongsToMany(models.Crypt, columnMapping);
  };
  return Book;
};
