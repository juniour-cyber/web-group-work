// Ensure script runs smoothly after DOM components completely render
document.addEventListener("DOMContentLoaded", function () {

    // === 1. SKILLS SECTION ===
    // Attaches interaction listeners to skill blocks to show/hide hidden descriptive sub-text.
    document.querySelectorAll('.skill-item').forEach(function (item) {
        item.addEventListener('click', function () {
            var details = this.querySelector('.skill-details');
            // Toggle the visibility utility helper class
            details.classList.toggle('hidden');
        });
    });


    // === 2. EDUCATION TABLE: SORT BY YEAR (ASCENDING/DESCENDING) ===
    var sortButton = document.getElementById('sort-edu-btn');
    var isAscending = true; // Tracks the state toggle tracking variable

    // Rearranges table row collections chronologically according to numerical year cell values.
    sortButton.addEventListener('click', function () {
        var table = document.getElementById('education-table');
        var tbody = table.querySelector('tbody');
        // Convert rows HTMLCollection to a JavaScript array for sorting
        var rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort(function (rowA, rowB) {
            // Target the 3rd column cell index [2] containing the primary year string element
            var cellA = parseInt(rowA.cells[2].textContent.trim());
            var cellB = parseInt(rowB.cells[2].textContent.trim());

            // Run conditional check to sort ascending or descending order
            if (isAscending) {
                return cellA - cellB;
            } else {
                return cellB - cellA;
            }
        });

        // Re-append the elements onto the DOM body node structure in their newly calculated sorted order
        rows.forEach(function (row) {
            tbody.appendChild(row);
        });

        // Toggle state tracking value and update button text view interface state indicator
        isAscending = !isAscending;
        sortButton.textContent = isAscending ? "Sort by Year (Ascending)" : "Sort by Year (Descending)";
    });


    // === 3. HOBBIES SECTION: READ MORE / READ LESS TOGGLE ===
    // Expands or truncates long block descriptions by swapping clipping classes.
    document.querySelectorAll('.hobby-text').forEach(function (paragraph) {
        paragraph.addEventListener('click', function () {
            // Swaps the line-clamp CSS layout properties configuration rule
            this.classList.toggle('collapsed');
        });
    });


    // === 4. DARK / LIGHT MODE THEME SWITCHER TOGGLE ===
    var themeToggleBtn = document.getElementById('theme-toggle');

    // Inverts Document container styling profiles by appending or destroying designated class rule configurations.
    themeToggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        
        // Updates inner button labels interactively based on body context class inclusion status flags
        if (document.body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = "Toggle Light Mode";
        } else {
            themeToggleBtn.textContent = "Toggle Dark Mode";
        }
    });

});