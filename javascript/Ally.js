// Function to toggle dark/light mode on the body
function initDarkMode() {
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '🌙 Dark Mode';
    toggleBtn.id = 'darkModeToggle';
    toggleBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 15px;
        background: #1a4a5f;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        z-index: 1000;
        font-weight: bold;
    `;
    
    // Check localStorage for saved mode
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleBtn.textContent = '☀️ Light Mode';
    }
    
    // Add click event
    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            toggleBtn.textContent = '☀️ Light Mode';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggleBtn.textContent = '🌙 Dark Mode';
        }
    });
    
    document.body.appendChild(toggleBtn);
}

// Add clickable skill items that expand hidden details
function initSkillsToggle() {
    const skillsList = document.querySelectorAll('section ul > li');
    
    skillsList.forEach(function(skill, index) {
        // Only add toggle to skills that have nested content
        if (skill.querySelector('ul') || skill.textContent.includes('Programming')) {
            skill.style.cursor = 'pointer';
            skill.style.padding = '8px';
            skill.style.borderRadius = '8px';
            skill.style.transition = 'background 0.3s';
            
            // Create hidden details div
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'skill-details hidden';
            detailsDiv.style.cssText = 'margin-top: 10px; padding: 10px; background: #e9ecef; border-radius: 8px; display: none;';
            
            if (skill.textContent.includes('Programming')) {
                detailsDiv.innerHTML = '<strong>More:</strong> I also want to learn Python, C++, and cybersecurity tools like Wireshark.';
            } else if (skill.textContent.includes('Data Analysis')) {
                detailsDiv.innerHTML = '<strong>More:</strong> Skilled in Excel, SQL, and data visualization. Learning Python for data science.';
            } else {
                detailsDiv.innerHTML = '<strong>More:</strong> Continuously improving my skills through online courses and practice.';
            }
            
            skill.appendChild(detailsDiv);
            
            // Add click event
            skill.addEventListener('click', function(e) {
                e.stopPropagation();
                const details = this.querySelector('.skill-details');
                if (details) {
                    if (details.style.display === 'none' || details.style.display === '') {
                        details.style.display = 'block';
                    } else {
                        details.style.display = 'none';
                    }
                }
            });
        }
    });
}

// Add sort button to reorder table rows by Year column
function initTableSort() {
    const table = document.querySelector('table');
    if (!table) return;
    
    // Create sort button
    const sortBtn = document.createElement('button');
    sortBtn.textContent = '📅 Sort by Year (Ascending)';
    sortBtn.style.cssText = `
        margin: 10px 0;
        padding: 8px 16px;
        background: #ffb347;
        color: #1a2a3a;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
    `;
    
    let sortAscending = true;
    
    // Insert button before table
    table.parentNode.insertBefore(sortBtn, table);
    
    sortBtn.addEventListener('click', function() {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // Extract year from each row (last column)
        rows.sort(function(rowA, rowB) {
            const yearA = rowA.cells[2].textContent.trim();
            const yearB = rowB.cells[2].textContent.trim();
            
            // Handle 'Present' as current year
            let yearValueA = yearA === 'Present' ? 2026 : parseInt(yearA);
            let yearValueB = yearB === 'Present' ? 2026 : parseInt(yearB);
            
            if (sortAscending) {
                return yearValueA - yearValueB;
            } else {
                return yearValueB - yearValueA;
            }
        });
        
        // Reorder rows in DOM
        rows.forEach(function(row) {
            tbody.appendChild(row);
        });
        
        // Toggle sort direction
        sortAscending = !sortAscending;
        sortBtn.textContent = sortAscending ? '📅 Sort by Year (Ascending)' : '📅 Sort by Year (Descending)';
    });
}

// ==================== HOBBIES READ MORE / READ LESS ====================
// Toggle to expand or collapse long hobby descriptions
function initHobbiesToggle() {
    const hobbiesItems = document.querySelectorAll('section ul li');
    
    hobbiesItems.forEach(function(item) {
        // Check if this is a hobby item
        if (item.innerHTML.includes('Gaming') || item.innerHTML.includes('Reading') || item.innerHTML.includes('Movies')) {
            const originalText = item.innerHTML;
            
            // Add read more/less button
            const readMoreBtn = document.createElement('button');
            readMoreBtn.textContent = ' Read More';
            readMoreBtn.style.cssText = `
                margin-left: 10px;
                background: none;
                border: none;
                color: #ff8c42;
                cursor: pointer;
                font-weight: bold;
            `;
            
            item.appendChild(readMoreBtn);
            
            let expanded = false;
            const shortText = item.innerHTML.split('–')[0] + '–...';
            
            readMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (!expanded) {
                    item.innerHTML = originalText;
                    readMoreBtn.textContent = ' Read Less';
                    expanded = true;
                } else {
                    item.innerHTML = shortText;
                    readMoreBtn.textContent = ' Read More';
                    expanded = false;
                    // Re-append the button
                    item.appendChild(readMoreBtn);
                }
            });
            
            // Initially set to shortened version
            if (item.innerHTML.length > 60) {
                item.innerHTML = shortText;
                item.appendChild(readMoreBtn);
            }
        }
    });
}

// ==================== IMAGE LIGHTBOX ====================
// Create lightbox when clicking on any image
function initLightbox() {
    const images = document.querySelectorAll('img');
    
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        cursor: pointer;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.maxWidth = '90%';
    lightboxImg.style.maxHeight = '90%';
    lightboxImg.style.borderRadius = '10px';
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✖';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 40px;
        background: white;
        border: none;
        font-size: 30px;
        cursor: pointer;
        border-radius: 50%;
        width: 50px;
        height: 50px;
    `;
    
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Add click event to all images
    images.forEach(function(img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
        });
    });
    
    // Close lightbox on click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.style.display = 'none';
        }
    });
}

// ==================== SCROLL TO TOP BUTTON ====================
// Button appears after scrolling 200px and smooth scrolls to top
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.textContent = '⬆ Top';
    scrollBtn.id = 'scrollToTop';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 12px 18px;
        background: #ffb347;
        color: #1a2a3a;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        display: none;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== DARK MODE CSS ====================
// Add dark mode styles dynamically
function addDarkModeStyles() {
    const style = document.createElement('style');
    style.textContent = `
        body.dark-mode {
            background-color: #121212;
            color: #e0e0e0;
        }
        body.dark-mode header,
        body.dark-mode section,
        body.dark-mode footer {
            background-color: #1e1e1e;
            color: #e0e0e0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        body.dark-mode header {
            background: linear-gradient(135deg, #0a1a2a, #0d2f3f);
        }
        body.dark-mode table {
            background-color: #2a2a2a;
        }
        body.dark-mode td {
            border-color: #444;
        }
        body.dark-mode a {
            color: #ffb347;
        }
        body.dark-mode .skill-details {
            background-color: #2a2a2a !important;
            color: #ccc;
        }
        body.dark-mode #darkModeToggle {
            background-color: #ffb347;
            color: #1a2a3a;
        }
    `;
    document.head.appendChild(style);
}

// ==================== INITIALIZE ALL FUNCTIONS ====================
// Run when page is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    addDarkModeStyles();
    initDarkMode();
    initSkillsToggle();
    initTableSort();
    initHobbiesToggle();
    initLightbox();
    initScrollToTop();
});
