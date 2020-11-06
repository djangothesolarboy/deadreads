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

    //let jsonReq = req.toJSON();

    // console.log("LOCALS:", res.locals.user.dataValues.id)

    res.render("book", { title: `${book.title}`, book });
  })
  );

router.post("/:id(d\\+)", asyncHandler(async (req, res) => {
  //const crypt
  let userId = res.locals.user.dataValues.id;
  const { username } = req.body;

  console.log(userId, "GINORMOUASDLFJSALDKFJ;OWEIJFAS.SDKLFJ;------------")

  res.redirect('/');
}))

module.exports = router;
