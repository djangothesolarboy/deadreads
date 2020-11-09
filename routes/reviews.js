const express = require("express");
const router = express.Router();
const { Review, Book, User } = require("../db/models");
const { asyncHandler } = require("./utils");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
      include: [User, Book],
    });

    const user = res.render("review-page", { title: "Reviews", reviews });
  })
);

module.exports = router;
