const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const { sequelize } = require("./db/models");
const { restoreUser } = require("./auth");
const {
  asyncHandler,
  errorLogger,
  create404,
  error404Handler,
  pageNotFound,
  genericHandler,
} = require("./routes/utils");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const cryptsRouter = require("./routes/crypts");
const apiRouter = require("./routes/api");

const app = express();

// view engine setup
app.set("view engine", "pug");

const store = new SequelizeStore({
  db: sequelize,
});
app.use(
  session({
    secret: "a5d63fc5-17a5-459c-b3ba-6d81792158fc",
    store,
    resave: false,
    saveUninitialized: false,
  })
);
store.sync();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(asyncHandler(restoreUser));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/users/:id/crypts", cryptsRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(create404);
app.use(error404Handler);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
