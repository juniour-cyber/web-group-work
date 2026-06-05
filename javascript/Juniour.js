//this line tells browser to read the js code after fully loading the html code
document.addEventListener('DOMContentLoaded',() =>{
    // ()=>, known as an arrow func used instead of traditional function(){}
  const skillsContainer = document.querySelector('.skills-zone'); // Adjust selector to match your HTML
   /*if condition ensures this code is skipped
     and no crash occurs incase there is no .skills-div class element*/ 
  if (skillsContainer) {
    /*e is an object that will be created by browser in order to run the following
     actions in case a click occurs*/
        skillsContainer.addEventListener('click', (e) => {
            // below line identifies the specific skill that was clicked
            const skillTitle = e.target.closest('.skill-item-header');
            if (skillTitle) {
                /*below code enables js to pick the html element next after the skill
                  heading which in this case is the skills description*/
                const details = skillTitle.nextElementSibling;
                //safety check to ensure the skills description element is actually available
                if (details && details.classList.contains('skill-details')) {
                    //the actual expand/shrink code
                    details.classList.toggle('is-visible');
                }
            }
        });
    }

    // 2. EDUCATION TABLE: Sorting rows by Year
    const sortBtn = document.getElementById('sort-year-btn');
    const eduTable = document.getElementById('education-table');
    /*below line checks whether the itams are in ascending or descending order
     so that the opposite action may be done*/
    let ascending = true;

    if (sortBtn && eduTable) {
        sortBtn.addEventListener('click', () => {
            const tbody = eduTable.querySelector('tbody');
            //converts list of rows into a js array
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
          //the below method compares two rows at a time and shuffles them based on the math defined inside
            rows.sort((rowA, rowB) => {
                const yearA = parseInt(rowA.querySelector('.year-col').textContent, 10);
                const yearB = parseInt(rowB.querySelector('.year-col').textContent, 10);
                return ascending ? yearA - yearB : yearB - yearA;
            });

            // Re-append rows in the new order
            rows.forEach(row => tbody.appendChild(row));
            
            // Toggle direction flag and update button visual indicator
            ascending = !ascending;
            sortBtn.textContent = `Sort by Year (${ascending ? '▲' : '▼'})`;
        });
    }

    // 3. HOBBIES SECTION: Read More / Read Less
    const hobbiesSection = document.querySelector('.hobbies-section');
    if (hobbiesSection) {
        hobbiesSection.addEventListener('click', (e) => {
            if (e.target.classList.contains('hobby-toggle-btn')) {
                const btn = e.target;
                //grabs the element right above the GamepadButton, which is the hobby you want to read more or less
                const description = btn.previousElementSibling;
                
                if (description && description.classList.contains('hobby-desc')) {
                    description.classList.toggle('expanded');
                    //change the info in the button for reading more/less
                    btn.textContent = description.classList.contains('expanded') ? 'Read Less' : 'Read More';
                }
            }
        });
    }

    // 4. IMAGE SECTION: Lightbox Overlay
    // Create a new div for the image overlay without affecting other html elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox-overlay';
    //creates an empty dynamic img tag in the lightbox div
    lightbox.innerHTML = `
        <div class="lightbox-content-wrapper">
            <span class="lightbox-close">&times;</span>
            <img id="lightbox-img" src="" alt="Enlarged view">
        </div>
    `;
    //takes the full lightbox structure and adds it at foot of html body section
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Open Lightbox on clickable images
    const galleryImages = document.querySelectorAll('.lightbox-trigger');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('lightbox-active');
        });
    });

    // Close Lightbox functions
    const closeLightbox = () => lightbox.classList.remove('lightbox-active');
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox(); // Close if background clicked
    });

    // 5. NAVIGATION: Smooth Scroll-To-Top
    const scrollTopBtn = document.getElementById('scroll');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            //checks if u have scrolled down more that 200px to either display or not the return button
            if (window.scrollY > 200) {
                //adds the indicated css class if condition is met
                scrollTopBtn.classList.add('btn-visible');
            } else {
                scrollTopBtn.classList.remove('btn-visible');
            }
        });
//handles what happens when the button from code above is clicked
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                //it will move the screen as if sliding instead of an instant jump
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 6. DARK/LIGHT MODE TOGGLE
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) {
        // Optional: Check local storage for persistent preference
        //localstorage is a built in browser storage tool that can check the previously chosen mode
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            //adds the dark theme mode that has been obtained from local storage to the body tag
            document.body.classList.add('dark-mode');
        }
//listens for a click on the theme button
        themeToggleBtn.addEventListener('click', () => {
            //adds the darkmode class to body tag if it isnt there and removes it if it is there
            //then the css will handle changing color based on this class
            document.body.classList.toggle('dark-mode');
            
            // Save selection to local storage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});


