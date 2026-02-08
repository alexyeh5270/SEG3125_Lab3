// Entry point and initialization
window.addEventListener("DOMContentLoaded", function () {
  // Auto-open Client tab on page load
  const btn = document.getElementById("defaultOpen");
  if (btn) btn.click();

  // Populate products list on page load
  populateListProductChoices("dietSelect", "displayProduct");
});

var search = document.getElementById("searchBar");
if (search) {
  search.addEventListener("input", function () {
    populateListProductChoices("dietSelect", "displayProduct");
  });
}
