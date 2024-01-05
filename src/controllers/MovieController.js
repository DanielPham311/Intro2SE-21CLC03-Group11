// const { move } = require('../routers/WatchMovieRouter');
const MovieService = require("../services/MovieService");

const controller = {};

controller.movie_detail = async (req, res) => {
  const movieId = req.params.movie_id;
  console.log(movieId);
  try {
    const movie = await MovieService.getMovieById(movieId);
    console.log(movie);
    res.render("movieScreen", {
      layout: "functional_layout",
      css_file_name: "movieWatching",
      movie: movie,
    });
  } catch (err) {
    console.error(err);
  }
};

controller.search = async (req, res) => {
  const movieName = req.body.movieName;
  console.log(movieName);
  try {
    const movie = await MovieService.searchByTitle(movieName);
    console.log(movie);
    res.render("movieSearchResult", {
      layout: "layout",
      result: movie,
    });
  } catch (err) {
    console.error(err);
  }
};

controller.searchByGenre = async (req, res) => {
  const genreList = req.body.genres;
  try {
    const movie = await MovieService.searchMovieByGenres(genreList);
    console.log(movie);
    res.render("movieSearchResult", {
      layout: "layout",
      result: movie,
    });
  } catch (err) {
    console.error(err);
  }
};

controller.movieSearchDefault = async (req, res) => {
  try {
    res.render("movieSearchResult", {
      layout: "layout",
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = controller;
