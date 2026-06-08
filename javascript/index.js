//this is an arrow function used instead of the traditional function writing style.
document.addEventListener('DOMContentLoaded', () => {
    // This event waits until the whole HTML page is fully loaded
// before running any JavaScript. This prevents errors if elements
// are not yet available in the DOM (Document Object Model).
    // 1. DIGITAL CLOCK LOGIC
    const clockDisplay = document.getElementById('digital-clock');
     /*if condition ensures this code is skipped
     and no crash occurs incase there is no digital-clock id element*/ 
    if (clockDisplay) {
        //runs the function repeatedly in the given time which in this case is 1 sec
        setInterval(() => {
//create a new time object which holds the current time
            const now = new Date();
            //convert the time into a readable format
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
            //enables termination of my typewriter function, this only has an effect on performance
            if (index < welcomeMessage.length) {
                welcomeElement.textContent += welcomeMessage.charAt(index);
                index++;
                //this is the line which calls the function after the short delay.
                setTimeout(typeWriter, typingSpeed);
            }
        }
        //starts the actual function implementation
        typeWriter();
    }
});
