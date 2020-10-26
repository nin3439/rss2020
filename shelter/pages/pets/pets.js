const menuIcon = document.querySelector(".hamburger-menu");
const navbar = document.querySelector(".navbar");
const body = document.querySelector("body");
const overlay = document.querySelector(".overlay");
const headerWrapper = document.querySelector(".header-wrapper");
const cards = document.querySelectorAll(".card");
const popupOverlay = document.querySelector(".popup-overlay");
const popupButton = document.querySelector(".popup__button");

let isMenuOpen = false;

menuIcon.addEventListener("click", () => {
  if (isMenuOpen) {
    navbar.classList.toggle("toggle-navbar");
    menuIcon.classList.add("rotate-hamburger-icon-back");
    menuIcon.classList.remove("rotate-hamburger-icon");
    body.classList.toggle("disable-body");
    overlay.classList.toggle("show-overlay");
    headerWrapper.classList.toggle("header-unset");
    isMenuOpen = false;
  } else {
    navbar.classList.toggle("toggle-navbar");
    menuIcon.classList.add("rotate-hamburger-icon");
    menuIcon.classList.remove("rotate-hamburger-icon-back");
    body.classList.toggle("disable-body");
    overlay.classList.toggle("show-overlay");
    headerWrapper.classList.toggle("header-unset");
    isMenuOpen = true;
  }
});

overlay.addEventListener("click", () => {
  if (isMenuOpen) {
    navbar.classList.toggle("toggle-navbar");
    menuIcon.classList.add("rotate-hamburger-icon-back");
    menuIcon.classList.remove("rotate-hamburger-icon");
    body.classList.toggle("disable-body");
    overlay.classList.toggle("show-overlay");
    headerWrapper.classList.toggle("header-unset");
    isMenuOpen = false;
  } else {
    navbar.classList.toggle("toggle-navbar");
    menuIcon.classList.add("rotate-hamburger-icon");
    menuIcon.classList.remove("rotate-hamburger-icon-back");
    body.classList.toggle("disable-body");
    overlay.classList.toggle("show-overlay");
    headerWrapper.classList.toggle("header-unset");
    isMenuOpen = true;
  }
});

popupOverlay.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  popupOverlay.classList.remove("popup-overlay-visible");
  body.classList.remove("disable-body");
});

for (const card of cards) {
  card.addEventListener("click", () => {
    popupOverlay.classList.add("popup-overlay-visible");
    body.classList.add("disable-body");
  });
}

popupButton.addEventListener("click", () => {
  popupOverlay.classList.remove("popup-overlay-visible");
  body.classList.remove("disable-body");
});
