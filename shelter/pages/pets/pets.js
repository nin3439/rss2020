const menuIcon = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.navbar');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const headerWrapper = document.querySelector('.header-wrapper');

let isMenuOpen = false;

menuIcon.addEventListener('click', () => {
    if (isMenuOpen) {
        navbar.classList.toggle('toggle-navbar');
        menuIcon.classList.add('rotate-hamburger-icon-back');
        menuIcon.classList.remove('rotate-hamburger-icon');
        body.classList.toggle('disable-body');
        overlay.classList.toggle('show-overlay');
        headerWrapper.classList.toggle('header-unset');
        isMenuOpen = false;
    } else {
        navbar.classList.toggle('toggle-navbar');
        menuIcon.classList.add('rotate-hamburger-icon');
        menuIcon.classList.remove('rotate-hamburger-icon-back');
        body.classList.toggle('disable-body');
        overlay.classList.toggle('show-overlay');
        headerWrapper.classList.toggle('header-unset');
        isMenuOpen = true;
    }
});



