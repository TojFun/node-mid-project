const express = require("express");
const router = express.Router();

const usersManagement = require("../services/usersManagement");

router.use((req, res, next) => {
  console.log("doing that");
  if (req.session.user.role !== "admin") return res.redirect("/");
  next();
});

// GET users management page:
router.get("/", async function (req, res, next) {
  const { status } = req.query;

  const users = await usersManagement.getAll();
  res.render("usersManagement", { users, status });
});

// GET specific user's edit page:
router.get("/:username", async (req, res, next) => {
  const { error } = req.query;
  const { username } = req.params;
  let user;

  const title = username === "create" ? "Create User" : `Update ${username}`;
  if (username === "create") {
    user = { role: null, username: "", credits: "" };
  } else {
    user = await usersManagement.getByUsername(username);

    if (user == null)
      return res.render("error", {
        message: `Couldn't find the user ${username}`,
        error: {},
      });
  }

  res.render("user", { title, user, error });
});

// POST specific user's info to the server:
router.post("/:username", async (req, res, next) => {
  const { username } = req.params;
  const { body: user } = req;

  try {
    if (username === "create") {
      await usersManagement.create(user);
      res.redirect("/users?status=created");
    } else {
      await usersManagement.update(username, user);
      res.redirect("/users?status=updated");
    }
  } catch (err) {
    res.redirect(`/users/${username}?error=${err.message}`);
  }
});

// DELETE a specific user:
router.delete("/:username", async (req, res, next) => {
  const deletingStatus = await usersManagement.delete(req.params.username);
  res.json(deletingStatus.ok);
});

module.exports = router;
