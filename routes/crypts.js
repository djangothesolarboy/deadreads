const express = require("express");
const router = express.Router();

const { requireAuth } = require("../auth");
const { asyncHandler } = require("./utils");
const { Crypt, User, Book, CryptJoinBook } = require("../db/models");

router.get(
  "/:id",
  requireAuth,
  asyncHandler(async (req, res) => {
    const cryptId = parseInt(req.params.id);
    console.log(cryptId);
    const crypt = await Crypt.findByPk(cryptId);

    const books = await CryptJoinBook.findAll({
      where: {
        cryptId,
      },
    });

    if (books.length > 0) {
      res.render("crypt", { title: `${crypt.name}`, crypt, books });
    } else {
      res.render("crypt", { title: `${crypt.name}` });
    }

    console.log(books);
  })
);

module.exports = router;
