const movieToDom = document.querySelector("#moviePosters");
const searchBar = document.getElementById("search");
const filterButtons = document.getElementsByName("filter");
const movieCounterPlaceholder = document.getElementById("movie-counter");
let searchMovie = searchBar.value;
let currentFilter = document.querySelector("input[name=filter]:checked");
// let currentUnderline = document.querySelector(".button-filter");

/*
hang een eventlistener aan alle radiobuttons en voer de setSelectedFilters functie uit
*/
filterButtons.forEach((button) => {
  button.addEventListener("change", (event) => {
    currentFilter = event.target;
    document.querySelector(".underline").classList.remove("underline");
    document.querySelector(`#div-${CSS.escape(currentFilter.value)}`).classList.add("underline");
    setSelectedFilters(currentFilter.value);
  });
});

/*
hang eventlistener aan de inputfield voer ook hier de setSelectedFilters functie uit, zodat deze voor zowel de input als de buttons werkt
*/
searchBar.addEventListener("input", (event) => {
  searchMovie = event.target.value.toLowerCase();
  setSelectedFilters(currentFilter.value);
});

/*
tel het aantal films die er zijn en geef deze weer op de pagina
*/
const movieCounter = (movieArr) => {
  let movieCount = movieArr.length;
  let movieQuantifier = "movies";
  if (movieCount === 1) {
    movieQuantifier = "movie";
  }
  movieCounterPlaceholder.innerHTML = `${movieCount} ${movieQuantifier} found`;
};

/*
maak de html stuctuur en vul de verschillende elementen.
Laat vervolgens de titel en de poster zien.
Link de posters door naar de imdb pagina
*/
const addMoviesToDom = (arr) => {
  movieToDom.innerHTML = "";
  return arr.map((movie) => {
    let newLI = document.createElement("li");
    let newA = document.createElement("a");
    let newP = document.createElement("p");
    let newImg = document.createElement("img");
    newP.innerHTML = movie.Title;
    newImg.src = movie.Poster;
    newA.href = "https://www.imdb.com/title/" + movie.imdbID;
    newA.target = "_blank";
    movieToDom.appendChild(newLI);
    newLI.appendChild(newP);
    newLI.appendChild(newA);
    newA.appendChild(newImg);
  });
};

/*
filter de gefilterde array met de inputfield
*/
const filterTheFilteredMovies = (movieArr) => {
  return movieArr.filter((movie) => {
    return movie.Title.toLowerCase().includes(searchMovie);
  });
};

/*
filter de films op de radiobuttons dmv switch statement en voer de filterTheFilteredMovies, addMoviesToDom en movieCounter uit
*/
const setSelectedFilters = (filter) => {
  let filteredMovies = [];
  switch (filter) {
    case "all":
      filteredMovies = movies;
      break;
    case "nieuwste":
      filteredMovies = movies.filter((movie) => {
        return movie.Year * 1 >= 2014;
      });
      break;
    case "avengers":
      filteredMovies = movies.filter((movie) => {
        return movie.Title.toLowerCase().includes("avengers");
      });
      break;
    case "xmen":
      filteredMovies = movies.filter((movie) => {
        return movie.Title.toLowerCase().includes("x-men");
      });
      break;
    case "princess":
      filteredMovies = movies.filter((movie) => {
        return movie.Title.toLowerCase().includes("princess");
      });
      break;
    case "batman":
      filteredMovies = movies.filter((movie) => {
        return movie.Title.toLowerCase().includes("batman");
      });
      break;
    default:
      return (filteredMovies = movies);
  }
  filteredMovies = filterTheFilteredMovies(filteredMovies);
  addMoviesToDom(filteredMovies);
  movieCounter(filteredMovies);
};

/*
Main starter
*/
setSelectedFilters(currentFilter.value);
