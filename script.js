// TMDB API Key and Base URL
const API_KEY = 'eeabdfb498249aa96f7ea9aacbbdfa3f'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const results = document.getElementById('results');
const pagination = document.getElementById('pagination');
const loading = document.getElementById('loading');
const movieModal = new bootstrap.Modal(document.getElementById('movie-modal'));
const movieTitle = document.getElementById('movie-title');
const moviePoster = document.getElementById('movie-poster');
const movieOverview = document.getElementById('movie-overview');
const movieReleaseDate = document.getElementById('movie-release-date');
const movieRating = document.getElementById('movie-rating');
const movieGenres = document.getElementById('movie-genres');

// GSAP Animations
gsap.from(".hero-section h1", { opacity: 0, y: -50, duration: 1 });
gsap.from(".hero-section p", { opacity: 0, y: 50, duration: 1, delay: 0.5 });

// Fetch Movies
async function fetchMovies(query) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await response.json();
  displayMovies(data.results);
}

// Display Movies
function displayMovies(movies) {
  results.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('col-md-4');
    movieCard.innerHTML = `
      <div class="card" onclick="showMovieDetails(${movie.id})">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">Rating: ⭐ ${movie.vote_average}</p>
        </div>
      </div>
    `;
    results.appendChild(movieCard);
    gsap.from(movieCard, { opacity: 0, scale: 0.9, duration: 0.5 });
  });
}

// Show Movie Details
async function showMovieDetails(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const movie = await response.json();

  movieTitle.textContent = movie.title;
  moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  movieOverview.textContent = movie.overview;
  movieReleaseDate.textContent = movie.release_date;
  movieRating.textContent = movie.vote_average;
  movieGenres.textContent = movie.genres.map(genre => genre.name).join(', ');

  movieModal.show();
}

// Search Button Click
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) fetchMovies(query);
});