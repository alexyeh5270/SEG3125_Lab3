// Reads user preferences from checkboxes and radio buttons
function getUserRestriction() {
  var vegEl = document.getElementById("chkVegetarian");
  var glutenEl = document.getElementById("chkGlutenFree");
  var organicEl = document.querySelector('input[name="organicPref"]:checked');

  return {
    vegetarian: vegEl ? vegEl.checked : false,
    glutenFree: glutenEl ? glutenEl.checked : false,
    organicPref: organicEl ? organicEl.value : "any",
  };
}

// Applies the selected text size to the page
function applyTextSize() {
  const checked = document.querySelector('input[name="textSize"]:checked');
  document.body.classList.remove("textSmall", "textMedium", "textLarge");

  if (!checked) return;

  if (checked.value === "small") document.body.classList.add("textSmall");
  if (checked.value === "medium") document.body.classList.add("textMedium");
  if (checked.value === "large") document.body.classList.add("textLarge");
}

function clearTextSize() {
  document
    .querySelectorAll('input[name="textSize"]')
    .forEach((r) => (r.checked = false));
  document.body.classList.remove("textSmall", "textMedium", "textLarge");
}
