const express = require("express");
const router = express.Router();

const { requireAuth } = require("../auth");
const { asyncHandler } = require("./utils");
const { Crypt, User, Book, CryptJoinBook } = require("../db/models");

router.get(
  "/books/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const { bookId } = req.body;

    const book = await Book.findByPk(bookId);
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
      const error = "This book has already been added to your crypt";
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

module.exports = router;
