document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('portfolio-contact-form');

    if (contactForm) {
        // Grab element references exactly like the video setup
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const msgField = document.getElementById('message');

        contactForm.addEventListener('submit', (event) => {
            // Stop the form submission to run custom JS validation instead
            event.preventDefault();

            // Run the main input validation engine
            validateInputs();
        });

        // Main validation routine handler 
        function validateInputs() {
            // 1. Fetch values and trim whitespaces from the front and back
            const nameValue = nameField.value.trim();
            const emailValue = emailField.value.trim();
            const msgValue = msgField.value.trim();

            // 2. Name validation check (Matches required field logic)
            if (nameValue === "") {
                setError(nameField, 'Username is required');
            } else {
                setSuccess(nameField);
            }

            // 3. Email validation check (Matches empty & format checks from video)
            if (emailValue === "") {
                setError(emailField, 'Email is required');
            } else if (!isValidEmail(emailValue)) {
                setError(emailField, 'Provide a valid email address');
            } else {
                setSuccess(emailField);
            }

            // 4. Message validation check
            if (msgValue === "") {
                setError(msgField, 'Message is required');
            } else {
                setSuccess(msgField);
            }
        }

        // Helper Function: Sets error UI elements dynamically
        function setError(element, message) {
            // Find the unique error text container relative to the input field
            const errorDisplay = document.getElementById(`${element.id}-error`);
            
            errorDisplay.textContent = message;
            element.style.borderColor = "#cc0000"; // Replaces the video's .error class rule 
        }

        // Helper Function: Clears error text and resets border to success
        function setSuccess(element) {
            const errorDisplay = document.getElementById(`${element.id}-error`);
            
            errorDisplay.textContent = "";
            element.style.borderColor = "#00ff41"; // Clean terminal green for absolute success
        }

        // Native email regular expression validator used in the video
        function isValidEmail(email) {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(String(email).toLowerCase());
        }

        // Reset click listener to scrub visual indicators clean
        contactForm.addEventListener('reset', () => {
            document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = "");
            document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
                input.style.borderColor = "#ccc";
            });
        });
    }
});
