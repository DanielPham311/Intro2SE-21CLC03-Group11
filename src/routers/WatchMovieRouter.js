const router = require("express").Router();
const MovieController = require('../controllers/MovieController');
router.get('/:movie_id', (req, res, next) => {
    try {
        return MovieController.movie_detail(req, res);
    } catch (err) {
        console.log(err);
    }
});

router.post("/movieResult", async (req, res) => {
    const checkboxes = ['TV Movie', 'History', 'Action', 'Animated', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller'];
    const checkedBoxes = checkboxes.filter(checkbox => req.body[checkbox] == 'on');

    if (req.body.movieName) {
        try {
            return MovieController.search(req, res);
        } catch (err) {
            console.log(err);
        }
    } else if (checkedBoxes.length > 0) {
        console.log("Is filtering the movies out");
        try {
            req.body.genres = checkedBoxes;
            return MovieController.searchByGenre(req, res);
        } catch (err) {
            console.log(err);
        }
    } else {
        return MovieController.movieSearchDefault(req, res);
    }
  });

module.exports = router;