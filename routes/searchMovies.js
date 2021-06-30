const express = require("express");
const router = express.Router();

const {
  genresLanguages: genresLanguagesInterface,
} = require("../models/jsonInterfaces");

router.get("/", async (req, res, next) => {
  const genresAndLanguages = await genresLanguagesInterface.get();

  res.render("searchMovies", genresAndLanguages);
});

module.exports = router;
