const {
  Account,
  User,
  Admin,
  SubscriptionPlan,
  Subscription,
  Bill,
  Episode,
  Season,
  Comment,
  CreditCard,
  MovieTrailer,
  WatchHistory,
  WatchList,
  Genre,
  Movie,
  Award,
} = require("../models"); // adjust the path to your models

const MovieService = {};

MovieService.findTopMovieRating = async (limit) => {
  try {
    const topRatedMovies = await Movie.findAll({
      limit: limit,
      order: [['rating', 'DESC']],
      // include: [{ model: Genre }] 
    });
    // return topRatedMovies;
    return topRatedMovies.map((topRatedMovies) => topRatedMovies.dataValues);
  } catch (error) {
    console.error(error);
    return [];
  }
}

MovieService.searchByTitle = async (movie_name) => {
  const Op = require("sequelize").Op;
  try {
    const movies = await Movie.findAll({
      where: {
        title: {
          [Op.like]: "%" + movie_name + "%",
        },
      },
      include: [
        { model: Genre },
        { model: MovieTrailer }
      ]
    });
    return movies.map((movies) => movies.dataValues);
  } catch (error) {
    console.error(error);
  }
};

MovieService.addMovieTrailer = async (movieTrailerData) => {
  try {
    return await MovieTrailer.create(movieTrailerData);
  } catch (error) {
    throw error;
  }
};

MovieService.getMovieTrailer = async (movieId) => {
  try {
    return await MovieTrailer.findAll({
      where: { movie: movieId },
    });
  } catch (error) {
    throw error;
  }
};

MovieService.CategorizeMovieByGenres = async (genreList) => {
  try {
    // Query each movie in parallel and return many arrays, each arrays is a list of movies that belong to a specific genre in genreList
    const results = await Promise.all(
      genreList.map((genreName) =>
        Movie.findAll({
          attributes: ["title"],
          include: [
            {
              model: Genre,
              where: { genre_name: genreName },
              attributes: [],
              through: { attributes: [] },
            },
          ],
        })
      )
    );
    // Find the intersection of the results and return
    const intersection = results.reduce((a, b) =>
      a.filter((c) => b.some((d) => d.title === c.title))
    );
    // Extract movie titles from the intersection
    return intersection.map((movie) => movie.dataValues);
  } catch (error) {
    throw error;
  }
};

MovieService.deleteMovieTrailer = async (movieId, trailerLink) => {
  try {
    const movieTrailer = await MovieTrailer.findOne({
      where: { movie: movieId, trailer_link: trailerLink },
    });
    if (!movieTrailer) {
      throw new Error("MovieTrailer association not found");
    }
    return await movieTrailer.destroy();
  } catch (error) {
    throw error;
  }
};

MovieService.addMovieToDB = async (movieData) => {
  try {
    return await Movie.create(movieData);
  } catch (error) {
    throw error;
  }
};

MovieService.getMovieById = async (id) => {
  try {
    return await Movie.findByPk(id);
  } catch (error) {
    throw error;
  }
};
MovieService.updateMovie = async (id, updatedData) => {
  try {
    let movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return await movie.update(updatedData);
  } catch (error) {
    throw error;
  }
};

MovieService.deleteMovie = async (id) => {
  try {
    let movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return await movie.destroy();
  } catch (error) {
    throw error;
  }
};
MovieService.getGenreOfMovie = async (movieId) => {
  try {
    const genres = await Genre.findAll({
      attributes: ["genre_name"],
      include: [
        {
          model: Movie,
          where: { movie_id: movieId },
          attributes: [],
          through: { attributes: [] }, // This will exclude attributes from the join table (GenreMovie)
        },
      ],
    });

    // Extract genre names from the query result
    return genres.map((genre) => genre.genre_name);
  } catch (error) {
    throw error;
  }
};

MovieService.getAwardOfMovie = async (movieId) => {
  try {
    const award = await Award.findAll({
      attributes: ["award_name"],
      include: [
        {
          model: Movie,
          where: { movie_id: movieId },
          attributes: [],
          through: { attributes: [] }, // This will exclude attributes from the join table (GenreMovie)
        },
      ],
    });

    // Extract genre names from the query result
    return award.map((award) => award.award_name);
  } catch (error) {
    throw error;
  }
};
MovieService.addUserWatchHistory = async (watchHistoryData) => {
  try {
    return await WatchHistory.create(watchHistoryData);
  } catch (error) {
    throw error;
  }
};

MovieService.getUserWatchHistory = async (userID) => {
  try {
    return await WatchHistory.findAll({
      where: { user: userID },
    });
  } catch (error) {
    throw error;
  }
};

MovieService.clearUserWatchHistory = async (userID) => {
  try {
    const watchHistory = await WatchHistory.findOne({
      where: { user: userID },
    });
    if (!watchHistory) {
      throw new Error("WatchHistory association not found");
    }
    return await watchHistory.destroy();
  } catch (error) {
    throw error;
  }
};

MovieService.addMovieToUserWatchList = async (watchListData) => {
  try {
    return await WatchList.create(watchListData);
  } catch (error) {
    throw error;
  }
};

MovieService.getUserWatchList = async (userID) => {
  try {
    return await WatchList.findAll({
      where: { user: userID },
    });
  } catch (error) {
    throw error;
  }
};

MovieService.clearUserWatchList = async (userID) => {
  try {
    const watchList = await WatchList.findOne({
      where: { user: userID },
    });
    if (!watchList) {
      throw new Error("WatchList association not found");
    }
    return await watchList.destroy();
  } catch (error) {
    throw error;
  }
};

MovieService.findTopMovieRating = async (k) => {
  try {
    const result = await Movie.findAll({
      order: [["rating", "DESC"]],
      limit: k,
      include: [{ model: Genre, through: "GenreMovie" }],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

MovieService.findAll = async (topK) => {
  try {
    const result = await Movie.findAll({
      limit: topK,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

MovieService.findAllFromTo = async (limit, offset) => {
  try {
    const result = await Movie.findAll({
      limit: limit,
      offset: offset,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

MovieService.findAllCinema = async (userOptions) => {
  const cLimit = userOptions.limit | 0;
  const cOffset = userOptions.offset | 0;
  try {
    // Default options
    const defaultOptions = {
      offset: cOffset,
      limit: cLimit,
      where: {
        // Your default where conditions go here
        // For example, you can include a condition that filters out unfinished movies
        isSeries: 0,
      },
      order: [["rating", "DESC"]],
    };

    // Merge user options with default options
    const options = {
      ...defaultOptions,
    };

    // Your Sequelize query here
    const movies = await Movie.findAll(options);

    return movies;
  } catch (error) {
    throw error;
  }
};

MovieService.findAllSeries = async (userOptions) => {
  const cLimit = userOptions.limit | 0;
  const cOffset = userOptions.offset | 0;
  try {
    // Default options
    const defaultOptions = {
      offset: cOffset,
      limit: cLimit,
      where: {
        // Your default where conditions go here
        // For example, you can include a condition that filters out unfinished movies
        isSeries: 1,
      },
      order: [["rating", "DESC"]],
    };

    // Merge user options with default options
    const options = {
      ...defaultOptions,
      ...userOptions,
    };

    // Your Sequelize query here
    const movies = await Movie.findAll(options);

    return movies;
  } catch (error) {
    throw error;
  }
};
module.exports = MovieService;
