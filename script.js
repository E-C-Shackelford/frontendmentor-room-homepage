const nav = document.querySelector(".c-nav");
const menuToggle = document.querySelector(".c-nav__menu-toggle");
const closeToggle = document.querySelector(".c-nav__close-toggle");
const navList = document.querySelector(".c-nav__list");
const overlay = document.querySelector(".c-overlay");
const mobileCutOffBreakpoint = 820;

////
// Nav Scroll Effect
////

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

////
// Mobile Menu Toggle/Close Toggle and Sliding Nav Panel
////

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

////
// Nav Behavior with Screen Resize
////

// avoid glitches when switching between mobile, tablet, and desktop views
window.addEventListener("resize", function () {
  // retrieve the current width of the browser viewport
  // does the current viewport match the desktop size?
  const isDesktop = this.window.innerWidth >= mobileCutOffBreakpoint;
  if (isDesktop) {
    toggleNavPanel(false);
    // communicate the nav list is visible in desktop views
    navList.setAttribute("aria-hidden", "false");
    navList.classList.remove("active");
    menuToggle.style.display = "none";
    closeToggle.style.display = "none";
    overlay.style.display = "none";
    // handle mobile view
  } else {
    navList.setAttribute("aria-hidden", "true");
    menuToggle.style.display = "block";
  }
});

////
// Hero-Carousel Nav Btns
////

// select all the slides
const slides = document.querySelectorAll(".c-hero-carousel__slide");
// track the index of the current active slide
let currentIndex = 0;

// index parameter represents the index of the slide that should become active
function displaySlide(index) {
  // loop through slides
  // current slide and its current index
  slides.forEach((slide, i) => {
    // is the current slide's index the same as the passed index?
    // add '--active' class if true, remove if false
    slide.classList.toggle("c-hero-carousel__slide--active", i === index);
  });
}

// loop through each slide and only select its specific navigation elements
slides.forEach((slide) => {
  const navContainers = slide.querySelectorAll(
    ".c-hero-carousel__nav--image, .c-hero-carousel__nav--cta"
  );

  // in the current slide, loop through each nav container and select its specific buttons
  navContainers.forEach((nav) => {
    const nextBtn = nav.querySelector(".c-hero-carousel__nav-btn--next");
    const prevBtn = nav.querySelector(".c-hero-carousel__nav-btn--previous");

    // ensure proper looping when navigating through the next new slides
    if (nextBtn) {
      // move current index forward by 1 slide and our result stays within the valid range of slide indices
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        displaySlide(currentIndex);
      });
    }

    // ensure proper looping when navigating through previous slides
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        // move current index back by 1 slide and add the total number of slides, so even if it results in a negative index,
        // it still loops correctly to the previous slide, and our result stays within the valid range of slide indices
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        displaySlide(currentIndex);
      });
    }
  });
});

// initial call displays the first slide as active on page load
// after each navigation interaction, the function is called to use currentIndex to update the DOM and display the current active slide
displaySlide(currentIndex);
