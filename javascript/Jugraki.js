
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. SKILLS SECTION: Clickable Expand/Collapse
    // ==========================================
    const skillsContainer = document.querySelector('.skills-container'); // Adjust selector to match your HTML
    if (skillsContainer) {
        skillsContainer.addEventListener('click', (e) => {
            const skillHeader = e.target.closest('.skill-item-header');
            if (skillHeader) {
                const details = skillHeader.nextElementSibling;
                if (details && details.classList.contains('skill-details')) {
                    details.classList.toggle('is-visible');
                    // Optional: Toggle an active class on the header for CSS styling (like rotating an arrow)
                    skillHeader.classList.toggle('active');
                }
            }
        });
    }

    // ==========================================
    // 2. EDUCATION TABLE: Sort rows by Year
    // ==========================================
    const sortBtn = document.getElementById('sort-year-btn');
    const eduTable = document.getElementById('education-table');
    let ascending = true;

    if (sortBtn && eduTable) {
        sortBtn.addEventListener('click', () => {
            const tbody = eduTable.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            // Assuming Year is in the specific column data-attribute or index (e.g., index 1)
            // Tip: Add data-year attribute to <tr> or <td> for highest reliability
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

    // ==========================================
    // 3. HOBBIES SECTION: Read More / Read Less
    // ==========================================
    const hobbiesContainer = document.querySelector('.hobbies-container');
    if (hobbiesContainer) {
        hobbiesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('hobby-toggle-btn')) {
                const btn = e.target;
                const description = btn.previousElementSibling;
                
                if (description && description.classList.contains('hobby-desc')) {
                    description.classList.toggle('expanded');
                    btn.textContent = description.classList.contains('expanded') ? 'Read Less' : 'Read More';
                }
            }
        });
    }

    // ==========================================
    // 4. IMAGE SECTION: Lightbox Overlay
    // ==========================================
    // Create and append the lightbox elements dynamically to keeping HTML clean
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content-wrapper">
            <span class="lightbox-close">&times;</span>
            <img id="lightbox-img" src="" alt="Enlarged view">
        </div>
    `;
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

    // ==========================================
    // 5. NAVIGATION: Smooth Scroll-To-Top
    // ==========================================
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollTopBtn.classList.add('btn-visible');
            } else {
                scrollTopBtn.classList.remove('btn-visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
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
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        themeToggleBtn.addEventListener('click', () => {
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
