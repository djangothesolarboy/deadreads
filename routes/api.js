const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { requireAuth } = require("../auth");
const { asyncHandler } = require("./utils");
const { Crypt, User, Book, CryptJoinBook, Review } = require("../db/models");

router.get(
  "/books/:id(\\d+)",
  asyncHandler(async (req, res) => {
    // const { bookId } = req.body;

    const bookId = parseInt(req.params.id);

    const book = await Book.findByPk(bookId, {
      include: [Review, User],
    });

    console.log(book);

    res.json(book);
  })
);

router.post(
  "/books/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const { bookId, cryptId } = req.body;

    console.log(bookId, cryptId);

    const exists = await CryptJoinBook.findOne({
      where: {
        bookId: bookId,
        cryptId: cryptId,
      },
    });

    if (exists) {
      const error = "This book has already been added";
      res.json(error);
    } else {
      const addBookToCrypt = await CryptJoinBook.create({
        cryptId,
        bookId,
      });
      const success = true;

      res.json(success);
    }
  })
);

router.get(
  "/search",
  asyncHandler(async (req, res) => {
    const searchTerm = req.query.searchTerm;

    const books = await Book.findAll({
      where: {
        title: {
          [Op.substring]: searchTerm,
        },
      },
    });

    // console.log(books);

    res.json(books);
  })
);

router.post(
  "/reviews",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { reviewText, bookId } = req.body;

    const userId = res.locals.user.dataValues.id;

    if (reviewText) {
      await Review.create({
        review: reviewText,
        userId,
        bookId,
      });
    } else {
      return;
    }

    const good = true;
    res.json(good);
  })
);

module.exports = router;
