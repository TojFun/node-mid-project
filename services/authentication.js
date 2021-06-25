const JSONFile = require("../models/jsonfile");
const usersInterface = new JSONFile("users");

async function check({ username, password }) {
  const { users } = await usersInterface.get();

  const user = users.find(
    (user) => user.username == username && user.password == password
  );

  const status =
    !user || user.length === 0
      ? "wrong"
      : user.credits <= 0
      ? "outOfCredits"
      : "success";

  return { user, status };
}

async function subtractCredit({ username, credits }) {
  credits = credits == "Infinity" ? "Infinity" : credits - 1;

  await usersInterface.update(({ users }) => {
    const index = users.findIndex((user) => user.username == username);

    users[index].credits = credits;

    return { users };
  });

  return credits;
}

function resetCredits() {
  await usersInterface.update(({ users }) => {
    users.forEach((user) => {
      user.credits = user.actions;
    });

    return { users };
  });
}

module.exports = { check, subtractCredit };
