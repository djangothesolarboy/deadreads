"use strict";

const User = require("./user");

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      review: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
    },
    {}
  );
  Review.associate = function (models) {
    const columnMapping = {
      through: "ReviewJoinBook",
      otherKey: "bookId",
      foreignKey: "reviewId",
    };
    Review.belongsTo(models.Book, { foreignKey: "bookId" });
    Review.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Review;
};
