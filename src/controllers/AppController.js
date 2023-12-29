const MovieService = require("../services/MovieService");

const show = async (req, res) => {
  try {
    const recommendedMovie = await MovieService.findTopMovieRating(1);
    // console.log(recommendedMovie);
    const unfinishedList = [{}, {}, {}];
    unfinishedList[0].unfinishedMovie = await MovieService.findAllFromTo(5, 0); // limit, offset
    unfinishedList[1].unfinishedMovie = await MovieService.findAllFromTo(5, 5);
    unfinishedList[2].unfinishedMovie = await MovieService.findAllFromTo(5, 10);

    const foryouList = [{}, {}, {}];
    foryouList[0].foryouMovie = await MovieService.findAllFromTo(5, 0); // limit, offset
    foryouList[1].foryouMovie = await MovieService.findAllFromTo(5, 5);
    foryouList[2].foryouMovie = await MovieService.findAllFromTo(5, 10);

    const cinemaList = [{}, {}, {}];
    cinemaList[0].cinemaMovie = await MovieService.findAllFromTo(5, 0); // limit, offset
    cinemaList[1].cinemaMovie = await MovieService.findAllFromTo(5, 5);
    cinemaList[2].cinemaMovie = await MovieService.findAllFromTo(5, 10);


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
