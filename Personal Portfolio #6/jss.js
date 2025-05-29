 // Simple JavaScript to confirm the script is loaded
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Yahia\'s Portfolio is ready!');

            // Smooth scroll for navigation links
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });