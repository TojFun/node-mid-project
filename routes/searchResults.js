const express = require("express");
const router = express.Router();
const users = require("../services/authentication");

const search = require("../services/searchMovies");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let { name, language, genres, mustIncludeMode } = req.query;

  mustIncludeMode = mustIncludeMode === "on";
  language = language === "null" ? null : language;

  try {
    const movies = await search.getMovies(
      { name, language, genres },
      mustIncludeMode
    );

    req.session.user.credits = await users.subtractCredit(req.session.user);

    res.render("searchResults", {
      movies,
      params: { name, language, genres },
    });
  } catch (error) {
    return res.render("error", { message: `There has been an error`, error });
  }
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    const movieInfo = await search.movieInfo(id);
    req.session.user.credits = await users.subtractCredit(req.session.user);

    res.render("movieInfo", { movie: movieInfo });
  } catch (error) {
    res.render("noSuchMovie", { error });
  }
});

module.exports = router;
