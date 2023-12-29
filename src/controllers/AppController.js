// import * as MovieService from '../services/MovieService';
const MovieService = require('../services/MovieService')

const show = async (req, res) => {
    const carouselItems = ["Item 1", "Item 2", "Item 3"]; // Your carousel item

    const recommendedMovie = await MovieService.findTopMovieRating(5);

    const unfinishedList = [];
    const foryouList = [];
    const cinemaList = [];
  
    res.render("index", {
      layout: "layout",
      recommendedMovie: recommendedMovie,
      unfinishedList: unfinishedList,
      foryouList: foryouList,
      cinemaList: cinemaList,
    });
};

module.exports = {
  show,
}