import {moviesData} from "./database.js";

const cardsContainer = document.querySelector(".main");
const inputSearch = document.querySelector("input");

let searchValue = "";
let filteredArrayOfMovies = [];

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
function handleSearch(event) {
    const searchValue = event.target.value.toLowerCase();

    filteredArrayOfMovies = searchValue ? moviesData.filter(movie =>
        ['Title', 'Director', 'Star1', 'Star2', 'Star3', 'Star4'].some(property =>
            filterMoviesByProperty(movie, property, searchValue.trim())
        )
    ) : moviesData;

    if (filteredArrayOfMovies.length > 0) {
        cardsContainer.innerHTML = "";
        creatMovieCard(filteredArrayOfMovies);
    }
}

function debounce(callback, delay){
    let timerId;

    return(...args)=>{
        clearTimeout(timerId);
        timerId = setTimeout(()=>{callback(...args)}, delay);
    }
}

const debounceInput = debounce(handleSearch, 500);

inputSearch.addEventListener("keyup", debounceInput);

creatMovieCard(moviesData);