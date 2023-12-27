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
async function searchByTitle(movie_name) {
  const Op = require("sequelize").Op;
  try {
    const movies = await Movie.findAll({
      where: {
        title: {
          [Op.like]: "%" + movie_name + "%",
        },
      },
    });
    return movies.map((movies) => movies.dataValues);
  } catch (error) {
    console.error(error);
  }
}

async function addMovieTrailer(movieTrailerData) {
  try {
    return await MovieTrailer.create(movieTrailerData);
  } catch (error) {
    throw error;
  }
}

async function getMovieTrailer(movieId) {
  try {
    return await MovieTrailer.findAll({
      where: { movie: movieId },
    });
  } catch (error) {
    throw error;
  }
}

async function CategorizeMovieByGenres(genreList) {
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
    return intersection.map((movie) => movie.title);
  } catch (error) {
    throw error;
  }
}

async function deleteMovieTrailer(movieId, trailerLink) {
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
}

async function addMovieToDB(movieData) {
  try {
    return await Movie.create(movieData);
  } catch (error) {
    throw error;
  }
}

async function getMovieById(id) {
  try {
    return await Movie.findByPk(id);
  } catch (error) {
    throw error;
  }
}

async function updateMovie(id, updatedData) {
  try {
    let movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return await movie.update(updatedData);
  } catch (error) {
    throw error;
  }
}

async function deleteMovie(id) {
  try {
    let movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return await movie.destroy();
  } catch (error) {
    throw error;
  }
}
async function getGenreOfMovie(movieId) {
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
}

async function getAwardOfMovie(movieId) {
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
}
async function addUserWatchHistory(watchHistoryData) {
  try {
    return await WatchHistory.create(watchHistoryData);
  } catch (error) {
    throw error;
  }
}

async function getUserWatchHistory(userID) {
  try {
    return await WatchHistory.findOne({
      where: { user: userID },
    });
  } catch (error) {
    throw error;
  }
}

async function clearUserWatchHistory(userID) {
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
}

async function addMovieToUserWatchList(watchListData) {
  try {
    return await WatchList.create(watchListData);
  } catch (error) {
    throw error;
  }
}

async function getUserWatchList(userID) {
  try {
    return await WatchList.findOne({
      where: { user: userID },
    });
  } catch (error) {
    throw error;
  }
}

async function clearUserWatchList(userID) {
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
}

module.exports = {
  CategorizeMovieByGenres: CategorizeMovieByGenres,
  searchByTitle: searchByTitle,
  addMovieToUserWatchList: addMovieToUserWatchList,
  getUserWatchList: getUserWatchList,
  clearUserWatchList: clearUserWatchList,
  addMovieToDB: addMovieToDB,
  getMovieById: getMovieById,
  deleteMovie: deleteMovie,
  updatedMovie: updateMovie,
  getGenreOfMovie: getGenreOfMovie,
  getAwardOfMovie: getAwardOfMovie,
  clearUserWatchHistory: clearUserWatchHistory,
  addUserWatchHistory: addUserWatchHistory,
  getUserWatchHistory: getUserWatchHistory,
  addMovieTrailer: addMovieTrailer,
  getMovieTrailer: getMovieTrailer,
  deleteMovieTrailer: deleteMovieTrailer,
};
