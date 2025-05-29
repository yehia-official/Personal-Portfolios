    // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });

        // Toggle mobile menu
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Intersection Observer for scroll reveal animations
        const revealElements = document.querySelectorAll('.reveal-item');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the item is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));

        // Animated Counters
        const counters = document.querySelectorAll('.counter');
        const counterObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.7 // Trigger when 70% of the counter is visible
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let count = 0;
                    const increment = target / 200; // Adjust speed of counting

                    const updateCounter = () => {
                        if (count < target) {
                            count += increment;
                            entry.target.innerText = Math.ceil(count);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.innerText = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, counterObserverOptions);

        counters.forEach(counter => counterObserver.observe(counter));


        // Custom Modal for Form Submission
        const contactForm = document.getElementById('contact-form');
        const successModal = document.getElementById('success-modal');
        const closeModalButton = document.getElementById('close-modal');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Simulate form submission (replace with actual AJAX call in production)
            console.log('Form submitted!');

            // Show the modal
            successModal.classList.add('show');
            successModal.classList.remove('hidden');

            // Clear the form
            this.reset();
        });

        closeModalButton.addEventListener('click', () => {
            successModal.classList.remove('show');
            successModal.classList.add('hidden');
        });

        // Close modal if clicked outside (optional)
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('show');
                successModal.classList.add('hidden');
            }
        });