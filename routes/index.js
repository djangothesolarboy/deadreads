const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const { User, Review, Book, sequelize } = require("../db/models");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (res.locals.user) {
      const userId = res.locals.user.dataValues.id;

      const reviews = await Review.findAll({
        include: [User, Book],
        order: sequelize.random(),
        limit: 5,
      });

      const books = await Book.findAll();

      res.render("index", { title: "deadreads", reviews, books });
    } else {
      res.redirect("/users/login");
    }
  })
);

module.exports = router;
