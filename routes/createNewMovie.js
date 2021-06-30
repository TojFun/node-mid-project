const express = require("express");
const router = express.Router();
const createMovies = require("../services/createMovies");
const users = require("../services/authentication");

const { genresAndLanguages } = new JSONFile("genresAndLanguages");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const { error } = req.query;
  const { genres, languages } = await genresAndLanguages.get();

  res.render("createNewMovie", { genres, languages, error });
});

router.post("/", async function (req, res, next) {
  try {
    await createMovies.create(req.body);

    req.session.user.credits = await users.subtractCredit(req.session.user);

    return res.redirect("/?status=created");
  } catch (error) {
    res.redirect(`/create?error=${error.message}`);
  }
});

module.exports = router;
