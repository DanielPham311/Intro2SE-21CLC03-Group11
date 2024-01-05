const router = require("express").Router();
const MovieController = require("../controllers/MovieController");
const getAllGenre = require("../services/MovieService").getAllGenre;
router.get("/:movie_id", (req, res, next) => {
  try {
    return MovieController.movie_detail(req, res);
  } catch (err) {
    console.log(err);
  }
});

router.post("/movieResult", async (req, res) => {
  let checkboxes = await getAllGenre();
  checkboxes = checkboxes.filter((checkbox) => req.body[checkbox]);

  if (req.body.movieName) {
    try {
      return MovieController.search(req, res);
    } catch (err) {
      console.log(err);
    }
  } else if (checkboxes.length > 0) {
    console.log("Is filtering the movies out");
    try {
      req.body.genres = checkboxes;
      return MovieController.searchByGenre(req, res);
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("No result found");
    return MovieController.movieSearchDefault(req, res);
  }
});

module.exports = router;
