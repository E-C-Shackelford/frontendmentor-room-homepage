const nav = document.querySelector(".c-nav");
const menuToggle = document.querySelector(".c-nav__menu-toggle");
const closeToggle = document.querySelector(".c-nav__close-toggle");
const navList = document.querySelector(".c-nav__list");
const overlay = document.querySelector(".c-overlay");

//// Nav Scroll Effect

// track scrolling to toggle 'scrolled' class
window.addEventListener("scroll", () => {
  // scroll down, 'scrolled' class added to nav, trigger bg change
  if (window.scrollY > 0) {
    nav.classList.add("scrolled");
    // when scrolled back to the top of the viewport (window.scrollY === 0), remove 'scrolled' class and bg reverts
  } else {
    nav.classList.remove("scrolled");
  }
});

//// Mobile Menu Toggle/Close Toggle and Sliding Nav Panel

// the parameter determines whether the navigation panel is open
function toggleNavPanel(isOpen) {
  // communicate current state of the navigation panel
  menuToggle.setAttribute("aria-expanded", isOpen);
  // communicate current purpose of the menuToggle based on the navigation panel state
  // if isOpen is true, next action is to close the navigation panel,
  // else if isOpen is false, next action is to open the navigation panel
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

  // navigation panel visibility
  navList.classList.toggle("active", isOpen);

  // navigation panel bg
  nav.classList.toggle("open-panel", isOpen);

  // toggle buttons' visibility based on current state of navigation panel
  menuToggle.style.display = isOpen ? "none" : "block";
  closeToggle.style.display = isOpen ? "block" : "none";

  // overlay visibility
  if (isOpen) {
    overlay.style.display = "block";
  } else {
    overlay.style.display = "none";
  }
}

// opening navigation panel
menuToggle.addEventListener("click", () => toggleNavPanel(true));
// closing navigation panel
closeToggle.addEventListener("click", () => toggleNavPanel(false));
