// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

var tabOrder = ["Client", "Products", "Cart"];
var currentTabIndex = 0;

function updateTabAvailability() {
  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    var tabName = tablinks[i].getAttribute("data-tab");
    var tabIndex = tabOrder.indexOf(tabName);
    if (tabIndex > currentTabIndex + 1) {
      tablinks[i].classList.add("disabled");
    } else {
      tablinks[i].classList.remove("disabled");
    }
  }
}

function openInfo(evt, tabName) {
  var nextIndex = tabOrder.indexOf(tabName);
  if (nextIndex === -1) return;
  if (nextIndex > currentTabIndex + 1) return;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  currentTabIndex = nextIndex;
  updateTabAvailability();

  // Repopulate products when switching to Products tab
  if (tabName === "Products") {
    populateListProductChoices("dietSelect", "displayProduct");
  }
}
