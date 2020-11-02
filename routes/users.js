var express = require("express");
var router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const db = require("../db/models");
const bcrypt = require("bcryptjs");

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

    try {
      // await user.save();
      console.log("hi");
      res.redirect("/");
    } catch (e) {
      //do something with the error
    }
  })
);

router.post("/");
module.exports = router;
