const menuIcon = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.navbar');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('toggle-navbar');
    menuIcon.classList.toggle('rotate-hamburger-icon');
    body.classList.toggle('disable-body');
    overlay.classList.toggle('show-overlay');

});