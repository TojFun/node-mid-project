const JSONFile = require("../models/jsonfile");
const usersJSON = new JSONFile("users");
const { getCurrentDate } = require("../utils/date.js");

exports.getAll = async () => (await usersJSON.get()).users;

exports.getByUsername = async (username) => {
  const allUsers = await this.getAll();
  return allUsers.find((user) => user.username === username);
};

exports.delete = async (username) => {
  const users = (await this.getAll()).filter(
    (user) => user.username !== username
  );

  return await usersJSON.put({ users });
};

exports.create = async (user) => {
  await usersJSON.update(({ users }) => {
    checkIfUsernameTaken(users, user.username, -1);

    user["date-created"] = getCurrentDate();
    users.push(user);

    return { users };
  });
};

exports.update = async (username, user) => {
  await usersJSON.update(({ users }) => {
    const userInJSON = users.find(
      (currentUser) => currentUser.username === username
    );

    const index = users.indexOf(userInJSON);

    checkIfUsernameTaken(users, user.username, index);

    user = formatUser(user, userInJSON);

    users[index] = user;
    return { users };
  });
};

function checkIfUsernameTaken(users, username, index) {
  if (
    users.some(
      (currentUser, currentIndex) =>
        currentUser.username === username && index !== currentIndex
    )
  )
    throw new Error("username is already taken");
}

function formatUser(user, userInJSON) {
  for (const key in userInJSON) {
    user[key] =
      user[key] == null || user[key].length === 0 ? userInJSON[key] : user[key];
  }

  return user;
}
