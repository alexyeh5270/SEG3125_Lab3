// Entry point and initialization

// This file has been refactored into smaller scripts to improve readability and maintainability.
// Below are the scripts and their purposes:

//navigation.js: Tab navigation
//preferences.js: User preferences and accessibility
//products.js: Product display and filtering
//cart.js: Shopping cart functionality
//notifications.js: Snackbar notifications

window.addEventListener("DOMContentLoaded", function () {
  // Auto-open Client tab on page load
  const btn = document.getElementById("defaultOpen");
  if (btn) btn.click();

  // Populate products list on page load
  populateListProductChoices("dietSelect", "displayProduct");
});
