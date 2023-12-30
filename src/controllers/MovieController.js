const { move } = require('../routers/WatchMovieRouter');
const MovieService = require('../services/MovieService')

const controller = {};

controller.movie_detail = async (req, res) => {
    const movieId = req.params.movie_id;
    console.log(movieId);
    try {
        const movie = await MovieService.getMovieById(movieId);
        console.log(movie);
        res.render('movieScreen', {
            layout: 'functional_layout',
            css_file_name: 'movieWatching',
            movie : movie,
         });
    } catch (err) {
        console.error(err);
    }
}

controller.search = async (req, res) => {
    
    res.json(req.user);
}

module.exports = controller;