const JSONFile = require("../models/jsonfile");
const newMovies = new JSONFile("newMovies");

const movies = require("../models/movies");

exports.create = async ({ name, language, genres }) => {
  try {
    const data = await newMovies.get();
    const index = data.movies.findIndex((movie) => movie.name === name);

    if (index < 0) {
      const id = await getID(data);

      data.movies.push({
        id,
        name,
        language,
        genres,
        image: { medium: "/images/no-image.png" },
      });
    } else {
      data.movies[index] = {
        id: data.movies[index].id,
        name,
        language,
        genres,
        image: data.movies[index].image,
      };
    }

    return await newMovies.put(data);
  } catch (error) {
    throw error;
  }
};

async function getID({ movies: allNewMovies }) {
  if (allNewMovies.length <= 0) allNewMovies = await movies.get();
  return allNewMovies[allNewMovies.length - 1].id + 1;
}