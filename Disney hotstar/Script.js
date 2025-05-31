// Navigation bar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 30, 0.95)';
    } else {
        navbar.style.backgroundColor = '#0f171e';
    }
});

// Content slider scroll buttons
document.addEventListener('DOMContentLoaded', function() {
    const contentSlider = document.querySelector('.content-slider');
    
    // Add scroll buttons if content overflows
    if (contentSlider.scrollWidth > contentSlider.clientWidth) {
        const leftButton = document.createElement('button');
        const rightButton = document.createElement('button');
        
        leftButton.innerHTML = '&#10094;';
        rightButton.innerHTML = '&#10095;';
        
        leftButton.className = 'scroll-button left';
        rightButton.className = 'scroll-button right';
        
        contentSlider.parentElement.style.position = 'relative';
        contentSlider.parentElement.appendChild(leftButton);
        contentSlider.parentElement.appendChild(rightButton);
        
        // Scroll functionality
        leftButton.addEventListener('click', () => {
            contentSlider.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        rightButton.addEventListener('click', () => {
            contentSlider.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
});

// Add hover effect to content cards
document.querySelectorAll('.content-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', function() {
    // Add search functionality here
    alert('Search functionality coming soon!');
});

// Subscribe button functionality
const subscribeBtn = document.querySelector('.subscribe-btn');
subscribeBtn.addEventListener('click', function() {
    // Add subscription functionality here
    alert('Subscription page coming soon!');
});

// Login button functionality
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', function() {
    // Add login functionality here
    alert('Login page coming soon!');
});

// Section Visibility Observer
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.categories');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Enhanced Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarButtons = document.querySelectorAll('.sidebar-menu li');
    const sections = {
        home: document.querySelector('.hero'),
        search: null,
        tv: document.querySelector('.tv-section'),
        movies: document.querySelector('.movies-section'),
        sports: document.querySelector('.sports-section'),
        videos: document.querySelector('.videos-section'),
        grid: document.querySelector('.categories')
    };

    // Add tooltips to sidebar buttons
    const tooltips = [
        'Home',
        'Search',
        'TV Shows',
        'Movies',
        'Sports',
        'Videos',
        'Grid View'
    ];

    sidebarButtons.forEach((button, index) => {
        // Create and add tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltips[index];
        button.appendChild(tooltip);

        // Add click animation
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;

            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Function to handle smooth scrolling with animation
    function scrollToSection(section) {
        if (section) {
            // Add fade-in animation to the target section
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.5s ease';
            
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Fade in the section
            setTimeout(() => {
                section.style.opacity = '1';
            }, 300);

            // Update active section in sidebar
            const sectionType = section.classList.contains('tv-section') ? 'tv' :
                              section.classList.contains('movies-section') ? 'movies' :
                              section.classList.contains('sports-section') ? 'sports' :
                              section.classList.contains('videos-section') ? 'videos' : 'home';
            
            updateActiveButton(sectionType);
        }
    }

    // Function to filter content based on category
    function filterContent(category) {
        const contentCards = document.querySelectorAll('.content-card');
        contentCards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Function to update active button
    function updateActiveButton(sectionType) {
        sidebarButtons.forEach((button, index) => {
            button.classList.remove('active');
            if ((sectionType === 'home' && index === 0) ||
                (sectionType === 'tv' && index === 2) ||
                (sectionType === 'movies' && index === 3) ||
                (sectionType === 'sports' && index === 4) ||
                (sectionType === 'videos' && index === 5)) {
                button.classList.add('active');
            }
        });
    }

    // Add click event listeners to sidebar buttons
    sidebarButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button with animation
            this.classList.add('active');
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            // Handle navigation based on button index
            switch(index) {
                case 0: // Home
                    scrollToSection(sections.home);
                    filterContent('all');
                    break;
                case 1: // Search
                    // Create and show search overlay
                    const searchOverlay = document.createElement('div');
                    searchOverlay.className = 'search-overlay';
                    searchOverlay.innerHTML = `
                        <div class="search-container">
                            <input type="text" placeholder="Search movies, shows, sports...">
                            <button class="close-search">×</button>
                        </div>
                    `;
                    document.body.appendChild(searchOverlay);
                    
                    // Add close functionality
                    searchOverlay.querySelector('.close-search').addEventListener('click', () => {
                        searchOverlay.remove();
                    });
                    break;
                case 2: // TV Shows
                    scrollToSection(sections.tv);
                    filterContent('tv');
                    break;
                case 3: // Movies
                    scrollToSection(sections.movies);
                    filterContent('movies');
                    break;
                case 4: // Sports
                    scrollToSection(sections.sports);
                    filterContent('sports');
                    break;
                case 5: // Videos
                    scrollToSection(sections.videos);
                    filterContent('videos');
                    break;
                case 6: // Grid
                    scrollToSection(sections.grid);
                    // Toggle grid/list view
                    const contentSlider = document.querySelector('.content-slider');
                    contentSlider.classList.toggle('grid-view');
                    break;
            }
        });
    });

    // Scroll spy for automatic navigation highlighting
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionType = section.classList.contains('tv-section') ? 'tv' :
                                  section.classList.contains('movies-section') ? 'movies' :
                                  section.classList.contains('sports-section') ? 'sports' :
                                  section.classList.contains('videos-section') ? 'videos' : 'home';
                
                updateActiveButton(sectionType);
            }
        });
    });

    // Add hover effect to sidebar buttons with enhanced animation
    sidebarButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateX(10px)';
            this.style.transition = 'all 0.3s ease';
            
            // Show tooltip with animation
            const tooltip = this.querySelector('.tooltip');
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(0)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateX(0)';
            
            // Hide tooltip with animation
            const tooltip = this.querySelector('.tooltip');
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-10px)';
        });
    });
});

// Add necessary CSS styles
const style = document.createElement('style');
style.textContent = `
    .tooltip {
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%) translateX(-10px);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 14px;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        white-space: nowrap;
    }

    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    .search-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .search-container {
        width: 80%;
        max-width: 600px;
        position: relative;
    }

    .search-container input {
        width: 100%;
        padding: 15px;
        font-size: 18px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 4px;
        color: white;
    }

    .close-search {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    }

    .grid-view {
        display: grid !important;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
    }
`;
document.head.appendChild(style);
