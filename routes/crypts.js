const express = require("express");
const router = express.Router();

const { requireAuth } = require("../auth");
const { asyncHandler } = require("./utils");
const { Crypt, User, Book, CryptJoinBook } = require("../db/models");

router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    // const userId = parseInt(User.id, 10);
    // console.log('req.params:', req.params);
    const crypt = await Crypt.findAll({
      where: {
        userId
      }
    });

    const books = await CryptJoinBook.findAll({
      where: {
        cryptId,
      },
    });
    console.log(books);

    if (books.length > 0) {
      res.render("crypt", { title: `${crypt.name}`, crypt, books });
    } else {
      res.render("crypt", { title: `${crypt.name}` });
    }

  })
);

module.exports = router;
