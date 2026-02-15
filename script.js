// ===== PREMIUM JAVASCRIPT FOR IDN PROPERTY =====

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all premium features
    createCustomCursor();
    initLoadingScreen();
    initScrollProgress();
    initNavigation();
    initScrollReveal();
    initBackToTop();
    initStatsCounter();
    initMobileMenu();
    initPropertyFilters();
    initSmoothScroll();
    
    // Hide loading screen after everything is loaded
    window.addEventListener('load', () => {
        setTimeout(hideLoadingScreen, 1000);
    });
}

// ===== CUSTOM CURSOR =====
function createCustomCursor() {
    // Only create cursor on desktop
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor follow animation
        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .property-card, .area-card, .team-card, .testimonial-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-logo">I</div>
        <div class="loading-text">LOADING EXCELLENCE</div>
    `;
    document.body.appendChild(loadingScreen);
}

function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 800);
    }
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        progressBarFill.style.transform = `scaleX(${scrollPercent})`;
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    // Add scroll effect to navigation
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.98)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide nav on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Highlight active navigation link
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!navToggle || !mobileMenu) return;
    
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        
        // Animate hamburger lines
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
    
    // Close menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Staggered animation
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Property cards staggered animation
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMATED STATS COUNTER =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count') || element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/[\d,]/g, '');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (suffix.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (suffix.includes('M+')) {
            element.textContent = Math.floor(current) + 'M+';
        } else if (suffix.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ===== PROPERTY FILTERS =====
function initPropertyFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const propertyCards = document.querySelectorAll('.property-card');
    
    if (filterTabs.length === 0) return;
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const filter = tab.getAttribute('data-filter');
            
            // Filter properties
            propertyCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Set first tab as active by default
    if (filterTabs.length > 0) {
        filterTabs[0].classList.add('active');
    }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = anchor.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORM ENHANCEMENTS =====
function initFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Floating label effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, var(--emerald-primary), var(--emerald-dark))';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== PAGE TRANSITIONS =====
function initPageTransitions() {
    const links = document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's an external link or current page
            if (!href || href.startsWith('http') || href === window.location.pathname) {
                return;
            }
            
            e.preventDefault();
            
            // Create transition overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: linear-gradient(135deg, var(--black), var(--emerald-primary));
                z-index: 10001;
                opacity: 0;
                transition: opacity 0.5s ease;
            `;
            document.body.appendChild(overlay);
            
            // Animate overlay in
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
            });
            
            // Navigate to new page
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===== RESPONSIVE ADJUSTMENTS =====
function handleResize() {
    const cursor = document.querySelector('.cursor');
    
    // Remove cursor on mobile
    if (window.innerWidth <= 768 && cursor) {
        cursor.remove();
    } else if (window.innerWidth > 768 && !cursor) {
        createCustomCursor();
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

// ===== INITIALIZE ADDITIONAL FEATURES =====
window.addEventListener('load', () => {
    initFormEnhancements();
    initParallax();
    initPageTransitions();
});

// ===== EASTER EGG: KONAMI CODE =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg: Make the logo dance
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.style.animation = 'logoFloat 0.5s ease-in-out infinite alternate';
            setTimeout(() => {
                logo.style.animation = '';
            }, 3000);
        }
        
        // Reset the code
        konamiCode = [];
    }
});

// ===== PERFORMANCE MONITORING =====
if (window.performance && window.performance.mark) {
    performance.mark('IDN-Property-JS-End');
}