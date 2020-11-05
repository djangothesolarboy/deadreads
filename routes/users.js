var express = require("express");
var router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { userValidators, loginValidators } = require("./utils");
const db = require("../db/models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { loginUser, logoutUser, requireAuth } = require("../auth");
const { Review } = require('../db/models');

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/sign-up", csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render("sign-up-form", {
    title: "New User",
    user,
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/sign-up",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { username, email, birthdate, gender, fullName, password } = req.body;
    console.log(username, email, birthdate);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      username,
      email,
      birthdate,
      gender,
      fullName,
      hashedPassword,
    });

    const hasReadCrypt = db.Crypt.create({
      name: "Have Read",
      userId: user.id,
    });

    const wantsToReadCrypt = db.Crypt.create({
      name: "Want to Read",
      userId: user.id,
    });

    const currentlyReadingCrypt = db.Crypt.create({
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

router.get("/login", csrfProtection, (req, res) => {
  res.render("log-in-form", { title: "Login", csrfToken: req.csrfToken() });
});

router.post(
  "/login",
  // csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

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
      // csrfToken: req.csrfToken(),
    });
  })
);

router.post("/logout", requireAuth, (req, res) => {
  logoutUser(req, res);
  res.redirect("/");
});

router.get(
  "/:id(\\d+)/crypts",
  requireAuth,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);

    const crypts = await db.Crypt.findAll({
      where: {
        userId,
      },
    });

    res.render("user-crypts", { title: "My Crypts", crypts });
  })
);

router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    userId = parseInt(req.params.id);

    const user = await db.User.findByPk(userId);

    res.render("user-page", { title: "My Profile", user });
  })
);

router.get('/:id(\\d+)/reviews', asyncHandler(async (req, res) => {
  userId = parseInt(req.params.id);
  const reviews = await Review.findAll({
    where: {
      userId
    }
  });
  res.render('reviews', { title: 'Reviews', reviews });
}));

router.post("/");
module.exports = router;
