        // JavaScript for mobile menu functionality
        document.addEventListener('DOMContentLoaded', () => {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const closeMobileMenu = document.getElementById('close-mobile-menu');

            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
            });

            closeMobileMenu.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });

            // Close mobile menu when a navigation link is clicked
            const navLinks = mobileMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                });
            });

            // Typing Effect for Hero Description
            const typingTextElement = document.getElementById('typing-text');
            const typingCursorElement = document.getElementById('typing-cursor');
            const textToType = "A Creative Freelancer & Full Stack Developer";
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 70; // milliseconds per character
            let delayBetweenWords = 1500; // milliseconds before starting to delete or retype

            function typeWriter() {
                const currentText = textToType.substring(0, charIndex);
                typingTextElement.textContent = currentText;

                if (!isDeleting && charIndex < textToType.length) {
                    charIndex++;
                    setTimeout(typeWriter, typingSpeed);
                } else if (isDeleting && charIndex > 0) {
                    charIndex--;
                    setTimeout(typeWriter, typingSpeed / 2); // Faster deletion
                } else if (!isDeleting && charIndex === textToType.length) {
                    // Finished typing, wait then start deleting
                    setTimeout(() => { isDeleting = true; typeWriter(); }, delayBetweenWords);
                } else if (isDeleting && charIndex === 0) {
                    // Finished deleting, wait then start typing again
                    isDeleting = false;
                    setTimeout(typeWriter, typingSpeed);
                }
            }

            // Start typing effect after a short delay
            setTimeout(typeWriter, 1000);

            // Scroll Reveal Animation using Intersection Observer
            const animateElements = document.querySelectorAll('.animate-on-scroll');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Optionally, unobserve after animation to prevent re-triggering
                        // observer.unobserve(entry.target); // Uncomment if you only want the animation to play once
                    } else {
                        // Optional: remove is-visible when element scrolls out of view
                        // entry.target.classList.remove('is-visible');
                    }
                });
            }, {
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: '0px 0px -50px 0px' // Adjust when element is 50px from bottom of viewport
            });

            animateElements.forEach(element => {
                observer.observe(element);
            });

            // Back to Top Button functionality
            const backToTopButton = document.getElementById('back-to-top');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) { // Show button after scrolling 300px
                    backToTopButton.style.display = 'block';
                } else {
                    backToTopButton.style.display = 'none';
                }
            });

            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // Smooth scroll to top
                });
            });
        });
