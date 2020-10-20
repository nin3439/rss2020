const menuIcon = document.querySelector('.hamburger-menu');
const navburger = document.querySelector('.navburger');

menuIcon.addEventListener('click', () => {
    navburger.classList.toggle('change');
});