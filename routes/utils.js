const csrf = require("csurf");
const { check } = require("express-validator");

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
      return db.User.findOne({ where: { emailAddress: value } }).then(
        (user) => {
          if (user) {
            return Promise.reject(
              "The provided Email Address is already in use by another account"
            );
          }
        }
      );
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
  check("birthdate").exists({ checkFalsy: true }),
];

module.exports = { csrfProtection, asyncHandler, userValidators };
