        // JavaScript for smooth scrolling, buttons, and LLM features
        document.addEventListener('DOMContentLoaded', () => {
            // Toggle Mobile Menu
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    const headerOffset = document.querySelector('header').offsetHeight; // Header height
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Hide mobile menu after clicking a link
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                });
            });

            // Contact form submission handler (simple example without backend functionality)
            const contactForm = document.querySelector('#contact form');
            const formMessage = document.getElementById('form-message');

            if (contactForm && formMessage) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault(); // Prevent default form submission

                    // Here you would add logic to send the form data to a server or service
                    // For this example, we'll just display a simple success message
                    formMessage.classList.remove('hidden');
                    formMessage.classList.remove('text-red-500');
                    formMessage.classList.add('text-green-600');
                    formMessage.textContent = 'Message sent successfully! I will get back to you soon.';

                    // You can clear the form fields after submission
                    contactForm.reset();

                    // Hide the message after a few seconds
                    setTimeout(() => {
                        formMessage.classList.add('hidden');
                    }, 5000);
                });
            }

            // Function to open a modal
            function openModal(targetModal) {
                targetModal.classList.remove('hidden');
                targetModal.classList.add('open');
            }

            // Function to close a modal
            function closeModal(targetModal) {
                targetModal.classList.remove('open');
                targetModal.classList.add('hidden');
                // Reset modal content
                const loadingIndicator = targetModal.querySelector('[id$="-loading-indicator"]');
                const textElement = targetModal.querySelector('[id$="-text"]');
                const errorMessage = targetModal.querySelector('[id$="-error-message"]');

                if (loadingIndicator) loadingIndicator.classList.remove('hidden');
                if (textElement) {
                    textElement.classList.add('hidden');
                    textElement.textContent = '';
                }
                if (errorMessage) {
                    errorMessage.classList.add('hidden');
                    errorMessage.textContent = '';
                }
            }

            // LLM Integration: Enhance Project Description
            const enhanceButtons = document.querySelectorAll('.enhance-description-btn');
            const enhancedDescriptionModal = document.getElementById('enhanced-description-modal');
            const closeEnhancedDescriptionModalButton = document.getElementById('close-modal-button');
            const enhancedDescriptionLoadingIndicator = document.getElementById('modal-loading-indicator');
            const enhancedDescriptionText = document.getElementById('enhanced-description-text');
            const enhancedDescriptionErrorMessage = document.getElementById('modal-error-message');

            // Event listener for closing project description modal
            if (closeEnhancedDescriptionModalButton) {
                closeEnhancedDescriptionModalButton.addEventListener('click', () => closeModal(enhancedDescriptionModal));
            }
            if (enhancedDescriptionModal) {
                enhancedDescriptionModal.addEventListener('click', (e) => {
                    if (e.target === enhancedDescriptionModal) { // Close only if clicked on overlay, not content
                        closeModal(enhancedDescriptionModal);
                    }
                });
            }

            // Event listeners for enhance project description buttons
            enhanceButtons.forEach(button => {
                button.addEventListener('click', async (e) => {
                    const projectDescriptionElement = e.target.closest('.p-6').querySelector('.project-description');
                    const briefDescription = projectDescriptionElement ? projectDescriptionElement.textContent : '';

                    openModal(enhancedDescriptionModal);
                    enhancedDescriptionLoadingIndicator.classList.remove('hidden');
                    enhancedDescriptionText.classList.add('hidden');
                    enhancedDescriptionErrorMessage.classList.add('hidden');

                    try {
                        let chatHistory = [];
                        const prompt = `Enhance the following project description, making it more detailed, engaging, and professional. Focus on the project's purpose, key features, and the technologies used. Keep it concise but informative, around 100-150 words. The original description is: "${briefDescription}"`;
                        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

                        const payload = { contents: chatHistory };
                        const apiKey = "AIzaSyDY6wILnn83GbggMQTC2FbEXqYfRUst780"; // <--- ضع مفتاح API الخاص بك هنا
                        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(`API error: ${response.status} - ${errorData.error.message || 'Unknown error'}`);
                        }

                        const result = await response.json();

                        if (result.candidates && result.candidates.length > 0 &&
                            result.candidates[0].content && result.candidates[0].content.parts &&
                            result.candidates[0].content.parts.length > 0) {
                            const text = result.candidates[0].content.parts[0].text;
                            enhancedDescriptionText.textContent = text;
                            enhancedDescriptionText.classList.remove('hidden');
                        } else {
                            throw new Error('No content found in the API response.');
                        }
                    } catch (error) {
                        console.error('Error generating description:', error);
                        enhancedDescriptionErrorMessage.textContent = `Failed to generate description: ${error.message}. Please try again.`;
                        enhancedDescriptionErrorMessage.classList.remove('hidden');
                    } finally {
                        enhancedDescriptionLoadingIndicator.classList.add('hidden');
                    }
                });
            });

            // LLM Integration: Generate Creator Journey
            const generateJourneyBtn = document.getElementById('generate-journey-btn');
            const creatorJourneyModal = document.getElementById('creator-journey-modal');
            const closeJourneyModalButton = document.getElementById('close-journey-modal-button');
            const journeyModalLoadingIndicator = document.getElementById('journey-modal-loading-indicator');
            const creatorJourneyText = document.getElementById('creator-journey-text');
            const journeyModalErrorMessage = document.getElementById('journey-modal-error-message');

            // Event listener for closing Creator Journey modal
            if (closeJourneyModalButton) {
                closeJourneyModalButton.addEventListener('click', () => closeModal(creatorJourneyModal));
            }
            if (creatorJourneyModal) {
                creatorJourneyModal.addEventListener('click', (e) => {
                    if (e.target === creatorJourneyModal) { // Close only if clicked on overlay, not content
                        closeModal(creatorJourneyModal);
                    }
                });
            }

            if (generateJourneyBtn) {
                generateJourneyBtn.addEventListener('click', async () => {
                    openModal(creatorJourneyModal);
                    journeyModalLoadingIndicator.classList.remove('hidden');
                    creatorJourneyText.classList.add('hidden');
                    journeyModalErrorMessage.classList.add('hidden');

                    try {
                        let chatHistory = [];
                        const prompt = `Generate a compelling "Creator Journey" or "About Me" section for a front-end developer portfolio. Focus on passion for web design, bringing designs to life with code, and developing mobile designs. Include key milestones, learning experiences, and future aspirations. Keep it professional, engaging, and around 150-200 words.`;
                        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

                        const payload = { contents: chatHistory };
                        const apiKey = "AIzaSyDY6wILnn83GbggMQTC2FbEXqYfRUst780"; // <--- ضع مفتاح API الخاص بك هنا
                        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(`API error: ${response.status} - ${errorData.error.message || 'Unknown error'}`);
                        }

                        const result = await response.json();

                        if (result.candidates && result.candidates.length > 0 &&
                            result.candidates[0].content && result.candidates[0].content.parts &&
                            result.candidates[0].content.parts.length > 0) {
                            const text = result.candidates[0].content.parts[0].text;
                            creatorJourneyText.textContent = text;
                            creatorJourneyText.classList.remove('hidden');
                        } else {
                            throw new Error('No content found in the API response.');
                        }
                    } catch (error) {
                        console.error('Error generating Creator Journey:', error);
                        journeyModalErrorMessage.textContent = `Failed to generate Creator Journey: ${error.message}. Please try again.`;
                        journeyModalErrorMessage.classList.remove('hidden');
                    } finally {
                        journeyModalLoadingIndicator.classList.add('hidden');
                    }
                });
            }

            // LLM Integration: Skill Explainer
            const explainSkillButtons = document.querySelectorAll('.explain-skill-btn');
            const skillExplainerModal = document.getElementById('skill-explainer-modal');
            const closeSkillExplainerModalButton = document.getElementById('close-skill-explainer-modal-button');
            const skillExplainerLoadingIndicator = document.getElementById('skill-explainer-loading-indicator');
            const skillExplainerText = document.getElementById('skill-explainer-text');
            const skillExplainerErrorMessage = document.getElementById('skill-explainer-error-message');

            // Event listener for closing Skill Explainer modal
            if (closeSkillExplainerModalButton) {
                closeSkillExplainerModalButton.addEventListener('click', () => closeModal(skillExplainerModal));
            }
            if (skillExplainerModal) {
                skillExplainerModal.addEventListener('click', (e) => {
                    if (e.target === skillExplainerModal) { // Close only if clicked on overlay, not content
                        closeModal(skillExplainerModal);
                    }
                });
            }

            // Event listeners for explain skill buttons
            explainSkillButtons.forEach(button => {
                button.addEventListener('click', async (e) => {
                    const skillNameElement = e.target.closest('.p-6').querySelector('.skill-name');
                    const skillName = skillNameElement ? skillNameElement.textContent : '';

                    openModal(skillExplainerModal);
                    skillExplainerLoadingIndicator.classList.remove('hidden');
                    skillExplainerText.classList.add('hidden');
                    skillExplainerErrorMessage.classList.add('hidden');

                    try {
                        let chatHistory = [];
                        const prompt = `Explain "${skillName}" in the context of web development, its importance, and common applications. Keep the explanation concise, around 80-120 words.`;
                        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

                        const payload = { contents: chatHistory };
                        const apiKey = "AIzaSyDY6wILnn83GbggMQTC2FbEXqYfRUst780"; // <--- ضع مفتاح API الخاص بك هنا
                        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                        const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(`API error: ${response.status} - ${errorData.error.message || 'Unknown error'}`);
                        }

                        const result = await response.json();

                        if (result.candidates && result.candidates.length > 0 &&
                            result.candidates[0].content && result.candidates[0].content.parts &&
                            result.candidates[0].content.parts.length > 0) {
                            const text = result.candidates[0].content.parts[0].text;
                            skillExplainerText.textContent = text;
                            skillExplainerText.classList.remove('hidden');
                        } else {
                            throw new Error('No content found in the API response.');
                        }
                    } catch (error) {
                        console.error('Error generating skill explanation:', error);
                        skillExplainerErrorMessage.textContent = `Failed to generate explanation: ${error.message}. Please try again.`;
                        skillExplainerErrorMessage.classList.remove('hidden');
                    } finally {
                        skillExplainerLoadingIndicator.classList.add('hidden');
                    }
                });
            });
        });
