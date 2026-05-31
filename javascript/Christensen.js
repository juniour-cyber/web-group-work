// Tracks the current sorting order state for the education table
let sortorder = true;

// Toggles between dark mode and light mode CSS classes
function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

// Toggles the visibility class of a specific skill's details paragraph
function toggleSkillElement(event) {
    if (event.target.classList.contains('skill-details')) return;
    this.querySelector('.skill-details').classList.toggle('show');
}

// Sorts the education table rows by the year column in ascending or descending order
function sortEducationTable() {
    const tbody = document.querySelector('#eduTable tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((rowA, rowB) => {
        const yearA = parseInt(rowA.cells[2].textContent) || 0;
        const yearB = parseInt(rowB.cells[2].textContent) || 0;
        return sortorder ? yearA - yearB : yearB - yearA;
    });

    rows.forEach(row => tbody.appendChild(row));
    document.getElementById('sortEduBtn').textContent = `Sort by Year (${sortorder ? 'Desc' : 'Asc'})`;
    sortorder = !sortorder;
}

// Expands or collapses long hobby description texts on click
function toggleHobbyDescription(event) {
    const btn = event.target;
    const block = btn.previousElementSibling;
    block.classList.toggle('expanded');
    btn.textContent = block.classList.contains('expanded') ? 'Read Less' : 'Read More';
}

// Toggles the visibility of the scroll-to-top button based on scroll depth
function monitorScrollPosition() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    scrollBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
}

// Smoothly scrolls the window back to the top of the page
function scrollToTopPosition() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initializes and attaches all required UI event listeners upon DOM readiness
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
    document.getElementById('sortEduBtn').addEventListener('click', sortEducationTable);
    document.getElementById('scrollTopBtn').addEventListener('click', scrollToTopPosition);
    window.addEventListener('scroll', monitorScrollPosition);
    
    document.querySelectorAll('.skill-node').forEach(node => {
        node.addEventListener('click', toggleSkillElement);
    });

    document.querySelectorAll('.hobby-toggle-btn').forEach(btn => {
        btn.addEventListener('click', toggleHobbyDescription);
    });
});
