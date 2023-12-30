const router = require("express").Router();
const MovieController = require('../controllers/MovieController');
router.get('/:movie_id', (req, res, next) => {
    try {
        return MovieController.movie_detail(req, res);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;