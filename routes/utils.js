const csrf = require("csurf");
const { check } = require("express-validator");
const db = require("../db/models");

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const userValidators = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid username."),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email.")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account"
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid password."),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Passwords must match.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
  check("gender").exists({ checkFalsy: true }),
];

const loginValidators = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("PLease provide a valid username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("PLease provide a valid password."),
];

const errorLogger = (err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    // log to database
  } else {
    console.error(err);
  }
  next(err);
};

const create404 = (req, res, next) => {
  const err = new Error("Could not find the requested pages.");
  err.status = 400;
  next(err);
};

const error404Handler = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(404);
    res.render("page-not-found", { title: "404 - Page Not Found", err });
  } else {
    next(err);
  }
};

const genericHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = (process.env.NODE_ENV = "production");
  res.render("error", {
    title: "Server Error",
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
};

module.exports = {
  csrfProtection,
  asyncHandler,
  userValidators,
  loginValidators,
  errorLogger,
  create404,
  error404Handler,
  genericHandler,
};
