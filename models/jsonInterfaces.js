const JSONFile = require("./jsonfile");

const users = new JSONFile("users");
const newMovies = new JSONFile("newMovies");
const genresAndLanguages = new JSONFile("genresAndLanguages");

module.exports = { users, newMovies, genresAndLanguages };
