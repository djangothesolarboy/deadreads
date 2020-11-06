const express = require("express");
const router = express.Router();

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
        userId
      }
    });

    //console.log("LOCALS:", res.locals)

    res.render("book", { title: `${book.title}`, book, crypts });
  })
  );

router.post("/:id(\\d+)", asyncHandler(async (req, res) => {
  const userId = res.locals.user.dataValues.id;

  const bookId = parseInt(req.params.id, 10);
  const { cryptId } = req.body;

  const addBooktoCrypt = await CryptJoinBook.create({
    bookId,
    cryptId
  });

  res.redirect(`/users/${userId}/crypts/${cryptId}`);

}))

module.exports = router;
