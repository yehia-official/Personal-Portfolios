
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                }
            });
        });

        // Header scroll effect
        const header = document.getElementById('main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const closeMobileMenuButton = document.getElementById('close-mobile-menu');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });

        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });

        // Intersection Observer for animations
        const animateOnScrollElements = document.querySelectorAll('.fade-in-up, .scale-in');
        const skillBars = document.querySelectorAll('.skill-progress-fill');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-card')) {
                        const skillFill = entry.target.querySelector('.skill-progress-fill');
                        if (skillFill) {
                            const progress = skillFill.dataset.progress;
                            skillFill.style.width = progress + '%';
                        }
                    }
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        animateOnScrollElements.forEach(el => {
            observer.observe(el);
        });

        // Scroll-to-top button functionality
        const scrollToTopButton = document.getElementById('scroll-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                scrollToTopButton.classList.add('opacity-100', 'translate-y-0');
            } else {
                scrollToTopButton.classList.remove('opacity-100', 'translate-y-0');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initial animation for elements already in view on load
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.fade-in-up, .scale-in').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight) {
                    el.classList.add('animate');
                }
            });

            document.querySelectorAll('.skill-card').forEach(card => {
                const skillFill = card.querySelector('.skill-progress-fill');
                if (skillFill && card.getBoundingClientRect().top < window.innerHeight) {
                    const progress = skillFill.dataset.progress;
                    skillFill.style.width = progress + '%';
                }
            });
        });
