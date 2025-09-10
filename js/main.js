// Core initialization function
function initializeWebsite() {
    initializeTheme();
    initializeLoading();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeInteractions();
    initializeForms();
}

// Theme management
function initializeTheme() {
    let currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const themeSlider = document.getElementById('themeSlider');
    
    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        if (themeSlider) themeSlider.checked = theme === 'light';
        currentTheme = theme;
    }

    if (themeSlider) {
        themeSlider.checked = currentTheme === 'light';
        themeSlider.addEventListener('change', () => {
            setTheme(themeSlider.checked ? 'light' : 'dark');
        });
    }
}

// Loading screen
function initializeLoading() {
    window.addEventListener('load', () => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                document.getElementById('loadingOverlay').classList.add('hidden');
            }, 1500);
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollY = window.scrollY;

    // Scroll handler using requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll(lastScrollY);
                ticking = false;
            });
            ticking = true;
        }
        lastScrollY = window.scrollY;
    });

    // Mobile menu
    initializeMobileMenu();
}

// Scroll effects
function initializeScrollEffects() {
    initializeParallax();
    initializeRevealAnimations();
    initializeScrollToTop();
}

// Parallax effect
function initializeParallax() {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Reveal animations
function initializeRevealAnimations() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        handleReveal(entry.target, index);
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// Interactive elements
function initializeInteractions() {
    initializeQuantumCore();
    initializeServiceCards();
    initializeProfileImage();
    initializeButtons();
}

// Form handling
function initializeForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

// Utility functions
function handleReveal(element, index) {
    element.classList.add('revealed');
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}

function handleNavbarScroll(scrollY) {
    const navbar = document.getElementById('navbar');
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
        initializeWebsite();
    });
});

// ...existing code...

// Mobile Menu Implementation
function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinksContainer = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    mobileMenu?.addEventListener('click', () => {
        navLinksContainer?.classList.toggle('mobile-active');
        requestAnimationFrame(updateMobileMenuIcon);
    });

    document.addEventListener('click', (e) => {
        if (!navbar?.contains(e.target) && navLinksContainer?.classList.contains('mobile-active')) {
            navLinksContainer.classList.remove('mobile-active');
            requestAnimationFrame(updateMobileMenuIcon);
        }
    });
}

// Update Mobile Menu Icon
function updateMobileMenuIcon() {
    const mobileMenu = document.getElementById('mobileMenu');
    const isActive = document.getElementById('navLinks')?.classList.contains('mobile-active');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active', isActive);
    }
}

// Parallax Effect Implementation
function updateParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
}

// Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
    }

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        form.reset();
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Sent Successfully';
            setTimeout(() => {
                submitButton.innerHTML = 'Send Message';
            }, 2000);
        }
    }, 1500);
}

// Quantum Core Animation
function initializeQuantumCore() {
    const core = document.querySelector('.quantum-core');
    if (!core) return;

    const particles = 20;
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        particle.style.setProperty('--delay', `${i * (360 / particles)}deg`);
        core.appendChild(particle);
    }
}

// Service Cards Implementation
function initializeServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            requestAnimationFrame(() => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
            });
        });

        card.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            });
        });
    });
}

// Profile Image Animation
function initializeProfileImage() {
    const profileImage = document.querySelector('.profile-image');
    if (!profileImage) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    profileImage.classList.add('revealed');
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(profileImage);
}

// Enhanced Button Interactions
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            requestAnimationFrame(() => {
                btn.style.transform = 'translateY(-2px)';
            });
        });

        btn.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                btn.style.transform = 'translateY(0)';
            });
        });
    });
}

// Scroll to Top Implementation
function initializeScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-top-btn';
    scrollButton.innerHTML = '↑';
    document.body.appendChild(scrollButton);

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                scrollButton.classList.toggle('visible', window.scrollY > 500);
                ticking = false;
            });
            ticking = true;
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ...existing code...