const express = require("express");
const router = express.Router();

const JSONFile = require("../models/jsonfile");
const genresLanguagesInterface = new JSONFile("genresAndLanguages");

router.get("/", async (req, res, next) => {
  const genresAndLanguages = await genresLanguagesInterface.get();

  res.render("searchMovies", genresAndLanguages);
});

module.exports = router;
