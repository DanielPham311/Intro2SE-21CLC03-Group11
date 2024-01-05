document.addEventListener("DOMContentLoaded", function () {
  // Handle search form submission
  document
    .getElementById("searchForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Get the search input value
      var searchQuery = document.getElementById("movieName").value;

      // Perform search locally (replace this with your actual search logic)
      var searchResults = performLocalSearch(searchQuery);

      // Display search results
      displaySearchResults(searchResults);
    });
});

// Replace this function with your actual search logic
function performLocalSearch(query) {
  // Implement your search logic here
  // For example, filter an array of predefined data based on the query
  var mockData = [
    { title: "Movie 1", genres: ["Action", "Adventure"] },
    { title: "Movie 2", genres: ["Comedy", "Drama"] },
    // ... other mock data ...
  ];

  return mockData.filter(function (movie) {
    return movie.title.toLowerCase().includes(query.toLowerCase());
  });
}

function displaySearchResults(results) {
  // Get the container where search results will be displayed
  var resultsContainer = document.getElementById("searchResultsContainer");

  // Clear previous search results
  resultsContainer.innerHTML = "";

  // Display new search results
  if (results.length > 0) {
    results.forEach(function (movie) {
      var resultElement = document.createElement("div");
      resultElement.classList.add(
        "search_results",
        "fw-bold",
        "text-dark",
        "opacity-75",
        "text-decoration-none",
        "d-block"
      );
      resultElement.innerHTML = `<i class="bi bi-search"></i> ${
        movie.title
      } - ${movie.genres.join("/")}`;
      resultsContainer.appendChild(resultElement);
    });
  } else {
    resultsContainer.innerHTML = "<p>No results found</p>";
  }
}


function handleWatchBtnClick(event, movie_id) {
  event.preventDefault();

  // Get the movie ID from the clicked button's data attribute
  const movieId = movie_id;

  // Perform your custom checks based on the movie ID
  if (yourCustomCheckFunction(movieId)) {
    // If the check passes, navigate to the link
    window.location.href = event.target.getAttribute('href');
  } else {
    // If the check fails, do something else or just return
    console.log('Custom check failed. Do something else.');
  }
}