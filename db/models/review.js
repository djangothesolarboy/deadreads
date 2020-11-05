"use strict";

const User = require("./user");

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      review: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Review.associate = function (models) {
    const columnMapping = {
      through: "ReviewJoinBook",
      otherKey: "bookId",
      foreignKey: "reviewId",
    };
    Review.belongsToMany(models.Book, columnMapping);
    Review.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Review;
};
