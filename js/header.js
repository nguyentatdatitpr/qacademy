// Header functionality
class Header {
    constructor() {
        this.header = document.getElementById('header');
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.menuNav = document.querySelector('.menu-nav');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        // Scroll effect
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());

        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                !this.header.contains(e.target) &&
                this.menuNav.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Handle smooth scroll for anchor links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    let target = document.querySelector(href);

                    // Special handling for courses section - scroll to the header
                    if (href === '#courses') {
                        const coursesHeader = document.querySelector('.courses-header');
                        if (coursesHeader) {
                            target = coursesHeader;
                        }
                    }

                    if (target) {
                        const headerHeight = this.header.offsetHeight;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }

    toggleMobileMenu() {
        this.mobileMenuToggle.classList.toggle('active');
        this.menuNav.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (this.menuNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.mobileMenuToggle.classList.remove('active');
        this.menuNav.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize header when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Header();
});
