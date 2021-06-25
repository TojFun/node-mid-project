const express = require("express");
const router = express.Router();
const users = require("../services/authentication");

/* GET home page. */
router.get("/", function (req, res, next) {
  const { status } = req.query;

  res.render("login", { status });
});

router.post("/", async function (req, res, next) {
  if (!req.session.user) {
    const { user, status } = await users.check(req.body);

    if (status !== "success") return res.redirect(`/login?status=${status}`);

    req.session.user = user;
  }
  res.redirect("/");
});

module.exports = router;
