
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('portfolio-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            let formIsValid = true;

            // Elements references
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const msgField = document.getElementById('message');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const msgError = document.getElementById('message-error');

            // 1. Name validation check
            if (nameField.value.trim() === "") {
                nameError.textContent = "Please provide your name. This field cannot be empty.";
                nameField.style.borderColor = "#cc0000";
                formIsValid = false;
            } else {
                nameError.textContent = "";
                nameField.style.borderColor = "#ccc";
            }

            // 2. Email pattern validation check (using regex validation logic)
            const emailRegex = /^[a-zA-Z0-0._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (emailField.value.trim() === "") {
                emailError.textContent = "An email address is required.";
                emailField.style.borderColor = "#cc0000";
                formIsValid = false;
            } else if (!emailRegex.test(emailField.value.trim())) {
                emailError.textContent = "Invalid email format. Use pattern name@domain.com";
                emailField.style.borderColor = "#cc0000";
                formIsValid = false;
            } else {
                emailError.textContent = "";
                emailField.style.borderColor = "#ccc";
            }

            // 3. Message validation check
            if (msgField.value.trim() === "") {
                msgError.textContent = "Please draft a brief message before attempting submission.";
                msgField.style.borderColor = "#cc0000";
                formIsValid = false;
            } else {
                msgError.textContent = "";
                msgField.style.borderColor = "#ccc";
            }

            // Halt the browser standard frame routing if criteria are missing
            if (!formIsValid) {
                event.preventDefault();
            }
        });

        // Optional resetting layout listener to scrub visual signals instantly on Reset click
        contactForm.addEventListener('reset', () => {
            document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = "");
            document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(input => {
                input.style.borderColor = "#ccc";
            });
        });
    }
});
