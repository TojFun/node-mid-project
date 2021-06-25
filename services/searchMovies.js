const moviesInterface = require("../models/movies");

const JSONFile = require("../models/jsonfile");
const customMoviesInterface = new JSONFile("newMovies");

// Customizable:
const maxMoviesSearches = Infinity;
const maxSimilarContent = 3;
const accurateSimilarContentResults = true;

exports.getMovies = async (user, mustIncludeMode) => {
  const allMovies = await getAllMovies();

  const movies = await search(
    user,
    allMovies,
    mustIncludeMode,
    maxMoviesSearches
  );

  for (const movie of movies)
    movie.similarContent = await getSimilarContent(movie, allMovies);

  return movies;
};

async function search(
  { name, language, genres },
  allMovies,
  mustIncludeMode,
  maxSearches
) {
  genres = toArray(genres);

  const movies = [];
  const genresSearchMode = mustIncludeMode
    ? (condition) => genres.every(condition)
    : (condition) => genres.some(condition);

  for (const movie of allMovies) {
    if (movies.length >= maxSearches) break;

    if (
      movie.name.toLowerCase().includes(name.toLowerCase()) &&
      (language === movie.language || language == null) &&
      genresSearchMode((genre) => movie.genres.includes(genre) || genre == null)
    ) {
      movies.push({ id: movie.id, name: movie.name, genres: movie.genres });
    }
  }

  return movies;
}

exports.movieInfo = async (movieID) => {
  const allMovies = await getAllMovies();
  const {
    id,
    name,
    language,
    genres,
    image: { medium: image },
  } = allMovies.find((movie) => movie.id == movieID);

  return { id, name, language, genres: genres.join(", "), image };
};

async function getSimilarContent({ genres, id }, allMovies) {
  const movies = await search(
    { name: "", language: null, genres },
    allMovies,
    accurateSimilarContentResults,
    maxSimilarContent
  );

  return movies.filter((movie) => movie.id != id);
}

async function getAllMovies() {
  const moviesFromAPI = await moviesInterface.get();
  const { movies: customMovies } = await customMoviesInterface.get();

  return [...moviesFromAPI, ...customMovies];
}

function toArray(value) {
  value = (typeof value === "string" ? [value] : value) ?? [null];

  return value;
}
