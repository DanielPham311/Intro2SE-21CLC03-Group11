const MovieService = require("../services/MovieService");

// search movie

const show = async (req, res) => {
  try {
    const recommendedMovie = await MovieService.findTopMovieRating(5);
    // console.log(recommendedMovie);
    const unfinishedList = [{}, {}, {}];
    // this retrieve from the watchlist
    unfinishedList[0].unfinishedMovie = await MovieService.findAllFromTo(5, 0); // limit, offset
    unfinishedList[1].unfinishedMovie = await MovieService.findAllFromTo(5, 5);
    unfinishedList[2].unfinishedMovie = await MovieService.findAllFromTo(5, 10);

    const foryouList = [{}, {}, {}];
    // this retrive from the recommendMovie
    foryouList[0].foryouMovie = await MovieService.findAllFromTo(5, 0); // limit, offset
    foryouList[1].foryouMovie = await MovieService.findAllFromTo(5, 5);
    foryouList[2].foryouMovie = await MovieService.findAllFromTo(5, 10);

    // select moview where it is not a series
    const cinemaList = [{}, {}, {}];
    cinemaList[0].cinemaMovie = await MovieService.findAllFromTo(5, 0); // limit, offset
    cinemaList[1].cinemaMovie = await MovieService.findAllFromTo(5, 5);
    cinemaList[2].cinemaMovie = await MovieService.findAllFromTo(5, 10);

    // select movie is a series
    const TVList = [{}, {}, {}];
    TVList[0].tvSeries = await MovieService.findAllFromTo(5, 0); // limit, offset
    TVList[1].tvSeries = await MovieService.findAllFromTo(5, 5);
    TVList[2].tvSeries = await MovieService.findAllFromTo(5, 10);

    res.render("index", {
      layout: "layout",
      recommendedMovie: recommendedMovie,
      unfinishedList: unfinishedList,
      foryouList: foryouList,
      cinemaList: cinemaList,
      TVList: TVList
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  show,
};
