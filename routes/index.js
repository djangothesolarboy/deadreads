const express = require("express");
const router = express.Router();
const { asyncHandler } = require("./utils");
const { User, Review, Book } = require("../db/models");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const reviews = await Review.findAll({
      include: [User, Book],
    });

    const books = await Book.findAll({ limit: 5 });

    res.render("index", { title: "deadreads", reviews, books });
  })
);

module.exports = router;
