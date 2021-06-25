const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const { user } = req.session;
  const { status } = req.query;

  res.render("menu", { user, status });
});

module.exports = router;
