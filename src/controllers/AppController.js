const MovieService = require("../services/MovieService");

// search movie

const show = async (req, res) => {
  const PAGE_LIMIT = 5; // Adjust the page limit as needed
  const TOTAL_PAGES = 3; // Set the total number of pages based on your data

  try {
    const recommendedMovie = await MovieService.findTopMovieRating(5);
    // console.log(recommendedMovie);
    // this retrieve from the watchlist
    const unfinishedList = []; // this should retrieve from the WatchHistory List
    const data = await MovieService.findAllFromTo(PAGE_LIMIT * TOTAL_PAGES, 0);
    for (let page = 1; page <= TOTAL_PAGES; page++) {
      const startIndex = (page - 1) * PAGE_LIMIT;
      const endIndex = page * PAGE_LIMIT;
      unfinishedList[page - 1] = {
        unfinishedMovie: data.slice(startIndex, endIndex),
      };
    }

    // console.log(unfinishedList);

    const foryouList = [];
    const fylData = await MovieService.findAllFromTo(
      PAGE_LIMIT * TOTAL_PAGES,
      0
    );
    for (let page = 1; page <= TOTAL_PAGES; page++) {
      const startIndex = (page - 1) * PAGE_LIMIT;
      const endIndex = page * PAGE_LIMIT;
      foryouList[page - 1] = {
        foryouMovie: fylData.slice(startIndex, endIndex),
      };
    }

    // select moview where it is not a series
    const cinemaList = [];
    const cinemaPageData = await MovieService.findAllCinema({
      offset: 0,
      limit: PAGE_LIMIT * TOTAL_PAGES,
    });
    for (let page = 1; page <= TOTAL_PAGES; page++) {
      const startIndex = (page - 1) * PAGE_LIMIT;
      const endIndex = page * PAGE_LIMIT;

      // Assign the page data to the corresponding index in the unfinishedList array
      cinemaList[page - 1] = {
        cinemaMovie: cinemaPageData.slice(startIndex, endIndex),
      };
    }

    // select movie is a series
    const TVList = [];
    const TYListData = await MovieService.findAllSeries({
      offset: 0,
      limit: TOTAL_PAGES * PAGE_LIMIT,
    });

    console.log(TYListData.length);
    for (let page = 1; page <= TOTAL_PAGES; page++) {
      const startIndex = (page - 1) * PAGE_LIMIT;
      const endIndex = page * PAGE_LIMIT;

      // Assign the page data to the corresponding index in the unfinishedList array
      TVList[page - 1] = { tvSeries: TYListData.slice(startIndex, endIndex) };
    }

    console.log(TVList);

    res.render("index", {
      layout: "layout",
      recommendedMovie: recommendedMovie,
      unfinishedList: unfinishedList,
      foryouList: foryouList,
      cinemaList: cinemaList,
      TVList: TVList,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  show,
};