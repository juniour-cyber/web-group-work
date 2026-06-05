// Toggle skill details when skill item is clicked
document.querySelectorAll(".skill-item").forEach(function (item) {
  item.addEventListener("click", function () {
    var details = this.querySelector(".skill-details");
    details.classList.toggle("hidden");
  });
});

// Sort education table by year
var sortAscending = true;

document.getElementById("sortBtn").addEventListener("click", function () {
  var table = document
    .getElementById("educationTable")
    .getElementsByTagName("tbody")[0];
  var rows = Array.from(table.rows);

  rows.sort(function (a, b) {
    var yearA = parseInt(a.cells[2].textContent);
    var yearB = parseInt(b.cells[2].textContent);

    return sortAscending ? yearA - yearB : yearB - yearA;
  });

  rows.forEach(function (row) {
    table.appendChild(row);
  });

  sortAscending = !sortAscending;
});

// Read more / Read less toggle
document.getElementById("readMoreBtn").addEventListener("click", function () {
  var hobbyText = document.getElementById("hobbyText");

  hobbyText.classList.toggle("collapsed");

  if (hobbyText.classList.contains("collapsed")) {
    this.textContent = "Read More";
  } else {
    this.textContent = "Read Less";
  }
});

// Scroll to top button
var scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Dark and light mode toggle
document.getElementById("modeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});
