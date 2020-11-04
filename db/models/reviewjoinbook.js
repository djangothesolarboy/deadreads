'use strict';
module.exports = (sequelize, DataTypes) => {
  const ReviewJoinBook = sequelize.define('ReviewJoinBook', {
    reviewId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {});
  ReviewJoinBook.associate = function(models) {
    // associations can be defined here
  };
  return ReviewJoinBook;
};