const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { requireAuth } = require("../auth");
const { asyncHandler } = require("./utils");
const { Crypt, User, Book, CryptJoinBook } = require("../db/models");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("books", { title: "Books", books });
  })
);

router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = await Book.findByPk(bookId);
    const userId = res.locals.user.dataValues.id;
    const crypts = await Crypt.findAll({
      where: {
        userId,
      },
    });

    // crypts.map((crypt) => console.log(crypt.toJSON()));
    //console.log("LOCALS:", res.locals)

    res.render("book", { title: `${book.title}`, book, crypts });
  })
);

router.post(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const userId = res.locals.user.dataValues.id;

    const bookId = parseInt(req.params.id, 10);
    const { cryptId } = req.body;

    console.log(bookId, cryptId);

    const bookCrypt = await CryptJoinBook.findOne({
      where: {
        cryptId: cryptId,
        bookId: bookId,
      },
    });

    console.log(bookCrypt);

    // bookCrypt.map((book) => console.log(book.toJSON()));

    if (!bookCrypt) {
      const addBooktoCrypt = await CryptJoinBook.create({
        bookId,
        cryptId,
      });
    } else {
      const errors = { errors: "You already have this book in your crypt" };
      // res.json(errors);
    }

    res.render("book", { title: `${book.title}`, book, crypts });

    // res.redirect(`/users/${userId}/crypts/${cryptId}`);
  })
);

router.get(
  "/results",
  asyncHandler(async (req, res) => {
    const searchTerm = req.query.searchTerm;

    console.log(searchTerm);

    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${searchTerm}%` } },
          { author: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
    });

    console.log(books);

    res.render("results", { title: "Search Results", books, searchTerm });
  })
);

module.exports = router;
