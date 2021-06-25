const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("menu", { user: req.session.user });
});

module.exports = router;
