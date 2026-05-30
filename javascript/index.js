
document.addEventListener('DOMContentLoaded', () => {
    // 1. DIGITAL CLOCK LOGIC
    const clockDisplay = document.getElementById('digital-clock');
    if (clockDisplay) {
        setInterval(() => {
            const now = new Date();
            clockDisplay.textContent = now.toLocaleTimeString();
        }, 1000);
    }

    // 2. TYPEWRITER ANIMATION LOGIC
    const welcomeElement = document.getElementById('typewriter-welcome');
    const welcomeMessage = "Welcome to our student portfolio website! Here you can find information about our profiles, and contact details.";
    let index = 0;
    const typingSpeed = 40; // time gap in milliseconds per character 

    if (welcomeElement) {
        welcomeElement.textContent = ""; // Clear fallback block text
        function typeWriter() {
            if (index < welcomeMessage.length) {
                welcomeElement.textContent += welcomeMessage.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        typeWriter();
    }
});
