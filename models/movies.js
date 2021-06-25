const { default: axios } = require("axios");
const url = "https://api.tvmaze.com/shows";

exports.get = async () => {
  return (await axios.get(url)).data;
};
