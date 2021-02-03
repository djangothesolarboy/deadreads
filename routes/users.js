var express = require("express");
var router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { userValidators, loginValidators } = require("./utils");
const db = require("../db/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { loginUser, logoutUser, requireAuth } = require("../auth");
const { Review } = require("../db/models");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// GET users login page
router.get("/login", csrfProtection, (req, res) => {
  res.render("log-in-form", { title: "Login", csrfToken: req.csrfToken() });
});

// POST users login
router.post(
  "/login",
  loginValidators,
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    let errors = [];

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({
        where: {
          username,
        },
      });
      if (user !== null) {
        const passwordMatched = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );
        if (passwordMatched) {
          loginUser(req, res, user);
          return req.session.save(() => {
            res.redirect("/");
          });
        }
      }
      errors.push("Login failed for the provided username and password.");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render("log-in-form", {
      title: "Login",
      username,
      errors,
    });
  })
);

// GET users sign-up page
router.get("/sign-up", csrfProtection, (req, res) => {
  res.render("sign-up-form", {
    title: "New User",
    csrfToken: req.csrfToken(),
  });
});

// POST user sign-up
router.post(
  "/sign-up",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { username, email, gender, fullName, password } = req.body;
    let { birthdate } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!birthdate) {
      birthdate = new Date();
    }

    const user = await db.User.create({
      username,
      email,
      birthdate,
      gender,
      fullName,
      hashedPassword,
    });

    const hasReadCrypt = await db.Crypt.create({
      name: "Have Read",
      userId: user.id,
    });

    const wantsToReadCrypt = await db.Crypt.create({
      name: "Want to Read",
      userId: user.id,
    });

    const currentlyReadingCrypt = await db.Crypt.create({
      name: "Currently Reading",
      userId: user.id,
    });

    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      loginUser(req, res, user);
      return req.session.save(() => {
        res.redirect("/");
      });
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("sign-up-form", {
        title: "New User",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

// GET a user
router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    const user = await db.User.findByPk(userId);

    console.log("BIRTHDAY:", user.birthdate);
    const newDate = new Date(user.birthdate);
    console.log(
      "BETTER BIRTHDAY:",
      newDate.getDay(),
      newDate.getFullYear(),
      newDate.getMonth()
    );

    res.render("user-page", { title: "My Profile", user });
  })
);

// GET users logout
router.get("/logout", requireAuth, (req, res) => {
  logoutUser(req, res);
  res.redirect("/");
});

// GET all of a users crypts
router.get(
  "/:id(\\d+)/crypts",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    const user = await db.User.findByPk(userId);

    const crypts = await db.Crypt.findAll({
      where: {
        userId,
      },
      order: [["id"]],
    });

    res.render("user-crypts", { title: "My Crypts", crypts, user });
  })
);

// GET a users specified crypt
router.get(
  "/:id(\\d+)/crypts/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const cryptId = parseInt(req.params.id, 10);
    const crypt = await db.Crypt.findByPk(cryptId);
    // const userId = crypt.userId;

    const books = await db.CryptJoinBook.findAll({
      where: {
        cryptId,
      },
    });

    const booksArray = [];

    books.map((book) => {
      booksArray.push(book.bookId);
    });

    const displayBooks = await db.Book.findAll({
      where: {
        id: booksArray,
      },
    });

    displayBooks.map((book) => {
      console.log(book.toJSON());
    });

    // const displayBooks = await booksArray.forEach((bookId) => {
    //    db.Book.findAll({
    //     where: {
    //       id: bookId
    //     }
    //   });
    // });

    // console.log("DISPLAY BOOKS, BITCH:", displayBooks)

    if (displayBooks.length > 0) {
      res.render("crypt", { title: crypt.name, crypt, displayBooks });
    } else {
      res.render("crypt", { title: crypt.name, crypt });
    }
  })
);

// GET a users reviews
router.get(
  "/:id(\\d+)/reviews",
  asyncHandler(async (req, res) => {
    userId = parseInt(req.params.id);

    const reviews = await db.Review.findAll({
      include: db.Book,
    });

    // const reviews2 = reviews.map((review) => console.log(review.toJSON()));

    // const books = reviews.map((review) => console.log(review.Book.toJSON()));

    res.render("reviews", { title: "Reviews", reviews });
  })
);

module.exports = router;
