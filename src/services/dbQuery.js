const { Account, User,Admin, SubscriptionPlan, Subscription, Bill, Episode, Season, Comment,CreditCard, MovieTrailer, WatchHistory,WatchList , Genre, Movie, Award} = require('../models'); // adjust the path to your models

async function getFreeSubscriptionUsernames() {
    const freeSubscriptionUsers = await Account.findAll({
        attributes: ['username'],
        include: [
            {
                model: User,
                required: true,
                include: [
                    {
                        model: SubscriptionPlan,
                        required: true,
                        include: [
                            {
                                model: Subscription,
                                required: true,
                                where: { subscription_name: 'Free' }
                            }
                        ]
                    }
                ]
            }
        ]
    });

    return freeSubscriptionUsers.map(account => account.username);
}

async function getGenreOfMovie(movieId) {
    try {
      const genres = await Genre.findAll({
        attributes: ['genre_name'],
        include: [
          {
            model: Movie,
            where: { movie_id: movieId },
            attributes: [],
            through: { attributes: [] } // This will exclude attributes from the join table (GenreMovie)
          }
        ]
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
        attributes: ['award_name'],
        include: [
          {
            model: Movie,
            where: { movie_id: movieId },
            attributes: [],
            through: { attributes: [] } // This will exclude attributes from the join table (GenreMovie)
          }
        ]
      });
  
      // Extract genre names from the query result
      return award.map((award) => award.award_name);
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    getFreeSubscriptionUsernames: getFreeSubscriptionUsernames,
    getGenreOfMovie: getGenreOfMovie,
    getAwardOfMovie: getAwardOfMovie
};