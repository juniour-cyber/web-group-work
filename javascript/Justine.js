// SKILLS SECTION - SHOW/HIDE DETAILS

// Function to toggle skill details when clicked
document.querySelectorAll(".skill-item").forEach(function(skill) {

    skill.addEventListener("click", function() {

        let details = this.querySelector(".skill-details");
 if (details) {
            details.classList.toggle("hidden");
        }
    });

});
// EDUCATION TABLE SORTING


let ascending = true;

// Function to sort education records by year
function sortEducationTable() {

    let table = document.getElementById("educationTable");

    let rows = Array.from(table.rows).slice(1);

    rows.sort(function(rowA, rowB) {

        let yearA = parseInt(rowA.cells[2].textContent);
        let yearB = parseInt(rowB.cells[2].textContent);

       return ascending
            ? yearA - yearB
            : yearB - yearA;
 
    });

    rows.forEach(function(row) {
        table.appendChild(row);
    });

    ascending = !ascending;
}

document
.getElementById("sortBtn")
.addEventListener("click", sortEducationTable);



// READ MORE / READ LESS


// Function to expand or collapse hobby text
document.querySelectorAll(".readMoreBtn").forEach(function(button) {

    button.addEventListener("click", function() {

        let hobbyText = this.previousElementSibling;

        hobbyText.classList.toggle("expanded");

        if (hobbyText.classList.contains("expanded")) {

            this.textContent = "Read Less";

        } else {

            this.textContent = "Read More";

        }

    });

});



// IMAGE LIGHTBOX


let profileImage = document.getElementById("profileImage");

let lightbox = document.getElementById("lightbox");

let lightboxImage = document.getElementById("lightboxImage");

let closeButton = document.getElementById("closeLightbox");

// Function to open image in lightbox
function openLightbox() {

    lightbox.classList.remove("hidden");

    lightboxImage.src = profileImage.src;
}

// Function to close lightbox
function closeLightbox() {

    lightbox.classList.add("hidden");
}

profileImage.addEventListener("click", openLightbox);

closeButton.addEventListener("click", closeLightbox);



// SCROLL TO TOP BUTTON


let topButton = document.getElementById("topBtn");

// Function to show or hide scroll button
function handleScroll() {

    if (window.scrollY > 200) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

}

// Function to smoothly scroll to top
function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

window.addEventListener("scroll", handleScroll);

topButton.addEventListener("click", scrollToTop);



// DARK / LIGHT MODE


// Function to switch between dark and light mode
function toggleTheme() {

    document.body.classList.toggle("dark-mode");

}

document.getElementById("themeBtn")
.addEventListener("click", toggleTheme);
