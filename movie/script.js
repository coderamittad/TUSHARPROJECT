const movies = [
    {
        title: 'vanvaas',
        category: 'action',
        poster: 'movie/action-movie1.jpg', // Local path to the poster image
        file: './movies/va.mp4' // Local path to the movie file
    },
    {
        title: 'Drama Movie 1',
        category: 'drama',
        poster: 'images/drama-movie1.jpg', // Local path to the poster image
        file: 'videos/drama-movie1.mp4' // Local path to the movie file
    },
    {
        title: 'Comedy Movie 1',
        category: 'comedy',
        poster: 'images/comedy-movie1.jpg', // Local path to the poster image
        file: 'videos/comedy-movie1.mp4' // Local path to the movie file
    },
    // Add more movies as needed
];

const moviesContainer = document.getElementById('moviesContainer');
const searchBar = document.getElementById('searchBar');
const categoryButtons = document.querySelectorAll('.category-btn');
const moviePlayerContainer = document.getElementById('moviePlayerContainer');
const moviePlayer = document.getElementById('moviePlayer');
const closePlayerBtn = document.getElementById('closePlayerBtn');

function displayMovies(filteredMovies) {
    moviesContainer.innerHTML = '';
    filteredMovies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const moviePoster = document.createElement('img');
        moviePoster.src = movie.poster;
        moviePoster.alt = movie.title;

        // Fallback for broken images
        moviePoster.onerror = () => {
            moviePoster.style.display = 'none';
            movieCard.style.background = 
                'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)';
            movieCard.style.animation = 'rainbowAnimation 3s infinite';
        };

        const movieTitle = document.createElement('h2');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = movie.title;

        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieTitle);

        // Add event listener for playing movies
        movieCard.addEventListener('click', () => playMovie(movie.file));

        // Add hover animation
        movieCard.addEventListener('mouseenter', () => {
            movieCard.style.transform = 'scale(1.05)';
            movieCard.style.transition = 'transform 0.3s ease';
        });

        movieCard.addEventListener('mouseleave', () => {
            movieCard.style.transform = 'scale(1)';
        });

        moviesContainer.appendChild(movieCard);
    });
}

function playMovie(file) {
    moviePlayer.src = file;
    moviePlayerContainer.classList.remove('hidden');
    moviePlayer.play();
}

function closePlayer() {
    moviePlayer.pause();
    moviePlayerContainer.classList.add('hidden');
    moviePlayer.src = '';
}

searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
    );
    displayMovies(filteredMovies);
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        const filteredMovies = movies.filter(movie => movie.category === category);
        displayMovies(filteredMovies);
    });
});

closePlayerBtn.addEventListener('click', closePlayer);

// Initially display all movies
displayMovies(movies);
document.addEventListener('mousemove', (e) => {
    const body = document.body;

    // Add class to trigger animation
    body.classList.add('moving');

    // Update ripple position
    body.style.setProperty('--ripple-x', `${e.clientX}px`);
    body.style.setProperty('--ripple-y', `${e.clientY}px`);

    // Remove the animation class after a delay for smoother effect
    clearTimeout(body.removeRippleTimeout);
    body.removeRippleTimeout = setTimeout(() => {
        body.classList.remove('moving');
    }, 20000);
});