// Global variables
let currentPage = 'home';
const movieData = {
    'avatar': {
        title: 'Avatar: The Way of Water',
        rating: '9.2/10',
        description: '🌊 Avatar: The Way of Water is an amazing visual masterpiece! James Cameron has created a beautiful underwater world with advanced CGI technology. The story about family and protecting nature is very touching. Must watch in IMAX!',
        genre: 'Sci-Fi',
        duration: '192 minutes'
    },
    'topgun': {
        title: 'Top Gun: Maverick',
        rating: '8.8/10',
        description: '✈️ Top Gun: Maverick brings spectacular aerial action! Tom Cruise is still captivating at 60. Real flight scenes without CGI create an incredibly authentic feel. Perfect movie for action lovers!',
        genre: 'Action',
        duration: '130 minutes'
    },
    'spiderman': {
        title: 'Spider-Man: No Way Home',
        rating: '9.0/10',
        description: '🕷️ Spider-Man: No Way Home is the perfect superhero movie! Bringing together 3 generations of Spider-Man creates touching and humorous moments. The multiverse is explored intelligently and engagingly.',
        genre: 'Action',
        duration: '148 minutes'
    }
};

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    handleRouting();
});

// Initialize App
function initializeApp() {
    // Set up navigation
    setupNavigation();
    
    // Initialize page routing
    showPage('home');
    
    // Add scroll animations
    addScrollAnimations();
    
    // Track user interactions
    trackInteractions();
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', handleRouting);
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('href').substring(1);
            navigateTo(page);
        });
    });
}

// Page Routing System
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Update navigation
        updateNavigation(pageId);
        
        // Update URL
        history.pushState({page: pageId}, '', `#${pageId}`);
        
        // Page-specific initialization
        initializePage(pageId);
    }
}

function navigateTo(page) {
    showPage(page);
    window.scrollTo(0, 0);
}

function updateNavigation(activePageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activePageId}`) {
            link.classList.add('active');
        }
    });
}

function handleRouting() {
    const hash = window.location.hash.substring(1);
    const page = hash || 'home';
    showPage(page);
}

// Page-specific initialization
function initializePage(pageId) {
    switch(pageId) {
        case 'movies':
            initializeMoviesPage();
            break;
        case 'reviews':
            initializeReviewsPage();
            break;
        case 'trending':
            initializeTrendingPage();
            break;
    }
}

function initializeMoviesPage() {
    // Initialize filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function initializeReviewsPage() {
    // Add any reviews page specific functionality
    console.log('Reviews page initialized');
}

function initializeTrendingPage() {
    // Add trending page specific functionality
    console.log('Trending page initialized');
}

// Movie Details Modal
function openMovieDetail(movieId) {
    const movie = movieData[movieId];
    if (movie) {
        const modal = createMovieModal(movie);
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    } else {
        alert(`🎬 Loading movie information...\n\nWill redirect to details page shortly!`);
    }
}

function createMovieModal(movie) {
    const modal = document.createElement('div');
    modal.className = 'movie-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal(this.parentElement.parentElement)">&times;</span>
            <h2>${movie.title}</h2>
            <div class="modal-info">
                <p><strong>Rating:</strong> ${movie.rating}</p>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Duration:</strong> ${movie.duration}</p>
            </div>
            <p class="modal-description">${movie.description}</p>
            <div class="modal-actions">
                <button onclick="playTrailer('${movie.title}')">▶ Watch Trailer</button>
                <button onclick="closeModal(this.parentElement.parentElement.parentElement)">Close</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .movie-modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:2000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s}
        .movie-modal.show{opacity:1}
        .modal-content{background:white;padding:2rem;border-radius:15px;max-width:500px;width:90%;position:relative}
        .close-modal{position:absolute;top:10px;right:20px;font-size:2rem;cursor:pointer;color:#999}
        .modal-info{margin:1rem 0;padding:1rem;background:#f8f9fa;border-radius:5px}
        .modal-description{margin:1rem 0;line-height:1.8}
        .modal-actions{display:flex;gap:1rem;justify-content:center;margin-top:2rem}
        .modal-actions button{padding:0.8rem 1.5rem;border:none;border-radius:5px;cursor:pointer;font-weight:bold}
        .modal-actions button:first-child{background:#27ae60;color:white}
        .modal-actions button:last-child{background:#95a5a6;color:white}
    `;
    document.head.appendChild(style);
    
    return modal;
}

function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
}

function playTrailer(movieTitle) {
    alert(`🎬 Playing trailer "${movieTitle}"...\n\n▶ Video will start in a few seconds!`);
    
    // Fake loading effect
    setTimeout(() => {
        alert(`🍿 Trailer "${movieTitle}" is ready!\n\nClick OK to continue watching.`);
    }, 2000);
}

// Filter Movies
function filterMovies(genre) {
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach(item => {
        if (genre === 'all' || item.getAttribute('data-genre') === genre) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Full Review
function openFullReview(movieId) {
    const reviews = {
        'avatar': `
🌊 AVATAR: THE WAY OF WATER - DETAILED REVIEW

⭐ Rating: 9.2/10

🎬 Story:
James Cameron continues his Pandora exploration with stunning underwater scenes. The Jake Sully family faces new challenges as humans return.

🎨 Technical:
- Top-tier CGI, especially underwater scenes
- Immersive 3D technology
- Excellent surround sound

💫 Strengths:
- Breathtaking visuals
- Deep environmental message
- Natural acting

⚠️ Weaknesses:
- Somewhat long runtime (192 minutes)
- Simple storyline

🏆 Conclusion:
A visual masterpiece not to be missed. Especially worth watching in IMAX for maximum experience!
        `
    };
    
    alert(reviews[movieId] || "Review is being updated...");
}

// Newsletter Subscription
function subscribe(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email) {
        // Simulate API call
        showLoading();
        
        setTimeout(() => {
            hideLoading();
            alert(`✅ Successfully subscribed!\n\n📧 Email: ${email}\n\n🎬 You will receive:\n• New movie notifications\n• Exclusive reviews\n• Hottest trailers\n\nThank you for joining!`);
            event.target.reset();
        }, 1500);
    }
}

// Contact Form
function submitContact(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        alert(`📧 Message sent successfully!\n\nWe will respond within 24 hours.\n\nThank you for contacting us!`);
        event.target.reset();
    }, 1500);
}

// Loading Animation
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loading';
    loader.innerHTML = '<div class="spinner">⟳</div><p>Processing...</p>';
    loader.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        background:rgba(0,0,0,0.8);color:white;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        z-index:3000;font-size:1.2rem;
    `;
    
    const style = document.createElement('style');
    style.textContent = '.spinner{font-size:3rem;animation:spin 1s linear infinite}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('loading');
    if (loader) loader.remove();
}

// Scroll Animations
function addScrollAnimations() {
    const observeElements = document.querySelectorAll('.movie-card, .trending-item, .review-article');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    observeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// User Interaction Tracking
function trackInteractions() {
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Track button clicks
        if (target.tagName === 'BUTTON' || target.classList.contains('cta-btn')) {
            console.log('Button clicked:', target.textContent);
        }
        
        // Track movie card clicks
        if (target.closest('.movie-card')) {
            console.log('Movie card clicked');
        }
        
        // Track navigation
        if (target.classList.contains('nav-link')) {
            console.log('Navigation:', target.textContent);
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality (bonus)
function searchMovies(query) {
    const movies = document.querySelectorAll('.movie-card, .movie-item');
    const searchTerm = query.toLowerCase();
    
    movies.forEach(movie => {
        const title = movie.querySelector('h3, h4')?.textContent.toLowerCase() || '';
        if (title.includes(searchTerm)) {
            movie.style.display = 'block';
        } else {
            movie.style.display = 'none';
        }
    });
}

// Initialize lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
} 