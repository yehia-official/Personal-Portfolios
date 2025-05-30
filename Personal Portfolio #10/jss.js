 // Smooth scroll for "About Me" button
        document.getElementById('about-me-btn').addEventListener('click', function() {
            document.getElementById('about').scrollIntoView({
                behavior: 'smooth'
            });
        });

        // Load More functionality for work section
        document.getElementById('load-more-btn').addEventListener('click', function() {
            const hiddenItem = document.getElementById('hidden-work-item-4');
            if (hiddenItem) {
                hiddenItem.classList.remove('hidden');
                this.classList.add('hidden'); // Hide the button after loading
            }
        });

        // Animate skill bars and fade-in sections on scroll
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        const aboutSection = document.getElementById('about');
        const sections = document.querySelectorAll('section'); // Select all sections

        // Observer for skill bars
        const skillBarObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0%'; // Reset to 0 before animating
                        setTimeout(() => {
                            bar.style.width = targetWidth; // Animate to target width
                        }, 100); // Small delay to ensure reset takes effect
                    });
                    skillBarObserver.disconnect(); // Disconnect after animating once
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

        skillBarObserver.observe(aboutSection);

        // Observer for fade-in sections
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of the section is visible

        sections.forEach(section => {
            sectionObserver.observe(section);
        });