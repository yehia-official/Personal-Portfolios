
        document.addEventListener('DOMContentLoaded', () => {
            // Typing effect for the hero section
            const typingElement = document.querySelector('.typing-effect');
            const words = JSON.parse(typingElement.dataset.words);
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentWord = words[wordIndex];
                if (isDeleting) {
                    typingElement.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingElement.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }

                if (!isDeleting && charIndex === currentWord.length) {
                    setTimeout(() => isDeleting = true, 1000); // Pause at end of word
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }

                const typeSpeed = isDeleting ? 50 : 150; // Faster deleting, slower typing
                setTimeout(type, typeSpeed);
            }

            type();

            // Scroll animations using Intersection Observer
            const animateElements = document.querySelectorAll('.animate-on-scroll');
            const skillItems = document.querySelectorAll('.skill-item');

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // If it's the skills section, trigger progress bar animation
                        if (entry.target.id === 'skills') {
                            skillItems.forEach(skillItem => {
                                const progressBarFill = skillItem.querySelector('.progress-bar-fill');
                                const progress = skillItem.dataset.progress;
                                progressBarFill.style.width = progress + '%';
                            });
                        }
                        observer.unobserve(entry.target); // Stop observing once animated
                    }
                });
            }, {
                threshold: 0.1 // Trigger when 10% of the element is visible
            });

            animateElements.forEach(element => {
                observer.observe(element);
            });
        });

        // Initialize Lucide icons after all resources (including the script itself) are loaded
        window.onload = function() {
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        };