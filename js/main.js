// Main application functionality
class QAcademyApp {
    constructor() {
        this.init();
    }

    init() {
        // Initialize consult button
        this.initConsultButton();

        // Initialize course tag navigation
        this.initCourseTagNavigation();

        // Initialize parallax effect for banner (optional)
        this.initParallax();

        // Initialize animations on scroll
        this.initScrollAnimations();
    }

    initConsultButton() {
        // Consult button is handled by modal.js
        // No need to handle it here anymore

        // Also handle banner CTA button
        const bannerCTA = document.querySelector('.banner-cta .btn-secondary');
        if (bannerCTA) {
            bannerCTA.addEventListener('click', () => {
                this.scrollToCourses();
            });
        }
    }

    scrollToCourses() {
        const coursesSection = document.getElementById('courses');
        if (coursesSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = coursesSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            // If courses section doesn't exist yet, scroll down
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    }

    initCourseTagNavigation() {
        const courseTags = document.querySelectorAll('.course-tag[href^="#"]');

        courseTags.forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = tag.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initParallax() {
        // Simple parallax effect for banner image
        const bannerImage = document.querySelector('.banner-image');
        if (!bannerImage) return;

        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const parallaxSpeed = 0.5;
                    bannerImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    initScrollAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with .animate-on-scroll class
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => observer.observe(el));
    }
}

// Utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new QAcademyApp();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QAcademyApp, utils };
}
