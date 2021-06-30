// const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

const menuRouter = require("./routes/menu");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const usersManagementRouter = require("./routes/usersManagement");

const createNewMovieRouter = require("./routes/createNewMovie");
const searchMovies = require("./routes/searchMovies");
const searchResults = require("./routes/searchResults");

const date = require("./utils/date");
const authentication = require("./services/authentication");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware setup:
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  session({
    secret: "ofekswebsite",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  if (
    (!req.session.user || req.session.user?.credits <= 0) &&
    !req.originalUrl.startsWith("/login")
  )
    res.redirect("/login");
  else next();
});

// main routes:
app.use("/", menuRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

// movie routes:
app.use("/create", createNewMovieRouter);

app.use("/search", searchMovies);
app.use("/results", searchResults);

// users route:
app.use("/users", usersManagementRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).redirect("/");
  // next(createError(404));
});

// error handler:
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

date.repeatEveryMidnight(authentication.resetCredits);

module.exports = app;
