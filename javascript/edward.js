 /*SKILLS SECTION
   Purpose: Show/Hide skill descriptions when a skill is clicked */

// Select all skill items from the page
const skillItems = document.querySelectorAll(".skill-item");

// Loop through each skill item
skillItems.forEach(function(skill){

    // Listen for a click event on each skill
    skill.addEventListener("click", function(){

        // Find the corresponding detail paragraph
        const detail = skill.querySelector(".skill-detail");

        // Toggle visibility of the detail paragraph
        detail.classList.toggle("show");

    });



/* EDUCATION TABLE SORTING SECTION
   Purpose: Sort education records by year (Ascending/Descending) */


});const table = document.querySelector(".table"); 
// Get the table using its class name "table"

const sortBtn = document.getElementById("sortBtn"); 
// Get the button that will trigger sorting

let ascending = true; 
// This variable keeps track of sorting order (true = ascending, false = descending)

sortBtn.addEventListener("click", function () { 
// Add a click event to the button

    let rows = Array.from(table.rows).slice(1); 
    // Convert table rows into an array and remove the first row (header row)

    rows.sort(function (a, b) { 
    // Sort the rows using a custom function

        let yearA = parseInt(a.cells[2].textContent.split("-")[0]); 
        // Get the YEAR from first row, split by "-" and take starting year, then convert to number

        let yearB = parseInt(b.cells[2].textContent.split("-")[0]); 
        // Get the YEAR from second row, split by "-" and take starting year, then convert to number

        if (ascending) { 
        // If sorting order is ascending

            return yearA - yearB; 
            // Arrange from smallest year to largest year

        } else { 
        // If sorting order is descending

            return yearB - yearA; 
            // Arrange from largest year to smallest year

        }

    });

    rows.forEach(row => table.appendChild(row)); 
    // Re-attach sorted rows back into the table

    ascending = !ascending; 
    // Toggle sorting order (true becomes false, false becomes true)

});



/* HOBBIES SECTION
   Purpose: Show or hide additional hobby information */


const buttons = document.querySelectorAll(".toggleBtn");
// Select all toggle buttons (because we have many hobbies)

buttons.forEach(function(btn) {
// Loop through each button individually

    btn.addEventListener("click", function () {
// When this specific button is clicked

        const moreText = this.parentElement.querySelector(".more-text");
// Find the hidden text inside the same <li>

        if (moreText.style.display === "inline") {
// If text is already visible

            moreText.style.display = "none";
// Hide the extra text

            this.textContent = "Read More";
// Change button text back

        } else {
// If text is hidden

            moreText.style.display = "inline";
// Show the extra text

            this.textContent = "Read Less";
// Change button text

        }

    });

});





/* GALLERY LIGHTBOX SECTION
   Purpose: Display images in a larger popup view */


const images = document.querySelectorAll(".gallery img");
// Select all images inside gallery

const lightbox = document.getElementById("lightbox");
// Get the lightbox container

const lightboxImg = document.getElementById("lightboxImg");
// Get the image inside lightbox

const closeBtn = document.getElementById("closeBtn");
// Get close button (X)

images.forEach(function(img) {
// Loop through each image in gallery

    img.addEventListener("click", function () {
// When image is clicked

        lightbox.style.display = "flex";
// Show lightbox (make it visible)

        lightboxImg.src = this.src;
// Set clicked image as big image

    });

});

closeBtn.addEventListener("click", function () {
// When user clicks X button

    lightbox.style.display = "none";
// Hide lightbox

});

lightbox.addEventListener("click", function (e) {
// When user clicks outside image

    if (e.target === lightbox) {
// Only if click is background (not image)

        lightbox.style.display = "none";


    }

});






/* SCROLL TO TOP SECTION
   Purpose: Show button after scrolling and return user to top */


const topBtn = document.getElementById("topBtn");
// Get the scroll-to-top button

window.addEventListener("scroll", function () {
// Listen when user scrolls

    if (window.scrollY > 200) {
// If user has scrolled more than 200px

        topBtn.style.display = "block";
// Show button

    } else {
// If user is near top

        topBtn.style.display = "none";
// Hide button

    }

});

topBtn.addEventListener("click", function () {
// When button is clicked

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
// Smooth scroll back to top

});





/* DARK/LIGHT MODE SECTION
   Purpose: Switch between dark mode and light mode */


const themeToggle = document.getElementById("themeToggle");
// Get dark mode button

themeToggle.addEventListener("click", function () {
// When button is clicked

    document.body.classList.toggle("dark-mode");
// Toggle dark-mode class on body

    if (document.body.classList.contains("dark-mode")) {
// If dark mode is active

        themeToggle.textContent = "Light Mode";
// Change button text

    } else {
// If light mode is active

        themeToggle.textContent = "Dark Mode";
// Change button text

    }

});

