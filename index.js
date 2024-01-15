import {moviesData} from "./database.js";

const cardsContainer = document.querySelector(".main");
const inputSearch = document.querySelector(".input");
const movieRatings = document.querySelector("#rating-select");
const movieGenres = document.querySelector("#genre-select");

const creatElement = (element)=>document.createElement(element);

function creatMovieCard(movies){
    for(let movie of movies){
        const cardContainer = creatElement("div");
        cardContainer.classList.add("card", "shadow");

        // Image container
        const imageContainer = creatElement("div");
        imageContainer.classList.add("card-image-container");

        //Image Element
        const imageElement = creatElement("img");
        imageElement.classList.add("card-image");
        imageElement.setAttribute("src", movie.Poster_Link);
        imageElement.setAttribute("alt", movie.Title);

        imageContainer.appendChild(imageElement);
        cardContainer.appendChild(imageContainer);


        // Movie deatils conatiner
        const movieDetailsContainer = creatElement("div");
        movieDetailsContainer.classList.add("movie-details");

        const titleElement = creatElement("p");
        titleElement.classList.add("title");
        titleElement.innerText = movie.Title;
        movieDetailsContainer.appendChild(titleElement);

        const directorElement = creatElement("p");
        directorElement.classList.add("director");
        directorElement.innerText = `By: ${movie.Director}`;
        movieDetailsContainer.appendChild(directorElement);

        const genreElement = creatElement("p");
        genreElement.classList.add("genre");
        genreElement.innerText = `Genre: ${movie.Genre}`;
        movieDetailsContainer.appendChild(genreElement);

        //Movie ratings
        const ratings = creatElement("div");
        ratings.classList.add("ratings");

        const starRating = creatElement("div");
        starRating.classList.add("star-rating");
        ratings.appendChild(starRating);

        const starElement = creatElement("span");
        starElement.classList.add("material-icons-outlined");
        starElement.innerText = "star"
        starRating.appendChild(starElement);

        const ratingValue = creatElement("span");
        ratingValue.classList.add("rating-value");
        ratingValue.innerText = parseFloat(movie.IMDB_Rating);
        starRating.appendChild(ratingValue);

        const year = creatElement("p");
        year.classList.add("year");
        year.innerText = parseInt(movie.Year);
        ratings.appendChild(year);

        const certificate = creatElement("p");
        certificate.classList.add("certificate");
        certificate.innerText = movie.Certificate;
        ratings.appendChild(certificate);

        const runTime = creatElement("p");
        runTime.classList.add("Runtime");
        runTime.innerText = `${parseInt(movie.Runtime)} mins`;
        ratings.appendChild(runTime);


        cardContainer.appendChild(movieDetailsContainer)
        cardContainer.appendChild(ratings);
        cardsContainer.appendChild(cardContainer);
    }
}

// search box functionality

function filterMoviesByProperty(movie, property, searchValue) {
    return movie[property].toLowerCase().includes(searchValue);
}

function handleSearchAndRating(event) {
    const searchValue = inputSearch.value.toLowerCase();
    const ratings = movieRatings.value;
    const genres = movieGenres.value;

    let filteredMovies = moviesData;

    if (searchValue) {
        filteredMovies = filteredMovies.filter(movie =>
            ['Title', 'Director', 'Star1', 'Star2', 'Star3', 'Star4'].some(property =>
                filterMoviesByProperty(movie, property, searchValue.trim())
            )
        );
    }

    if (ratings) {
        filteredMovies = filteredMovies.filter(movie =>
            movie.IMDB_Rating >= ratings
        );
    }

    if(genres){
        filteredMovies = filteredMovies.filter(movie =>
            movie.Genre.includes(genres));
    }

    cardsContainer.innerHTML = "";
    creatMovieCard(filteredMovies);
}

const debounce = (callback, delay) => {
    let timerId;

    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => { callback(...args); }, delay);
    };
};

const debounceInput = debounce(handleSearchAndRating, 500);
inputSearch.addEventListener("keyup", debounceInput);
movieRatings.addEventListener("change", handleSearchAndRating);
movieGenres.addEventListener("change", handleSearchAndRating);

creatMovieCard(moviesData);