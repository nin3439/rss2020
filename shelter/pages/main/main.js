const menuIcon = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.navbar');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

let isMenuOpen = false;

menuIcon.addEventListener('click', () => {
    if (isMenuOpen) {
        navbar.classList.toggle('toggle-navbar');
        menuIcon.classList.add('rotate-hamburger-icon-back');
        menuIcon.classList.remove('rotate-hamburger-icon');
        body.classList.toggle('disable-body');
        overlay.classList.toggle('show-overlay');
        isMenuOpen = false;
    } else {
        navbar.classList.toggle('toggle-navbar');
        menuIcon.classList.add('rotate-hamburger-icon');
        menuIcon.classList.remove('rotate-hamburger-icon-back');
        body.classList.toggle('disable-body');
        overlay.classList.toggle('show-overlay');
        isMenuOpen = true;
    }
});

let pets = [];
const request = new XMLHttpRequest();
request.open('GET', './pets.json');
request.onload = () => {console.log(request.response)};
fetch('pets.json').then(res => res.json()).then(list => {
  pets = list;
})
console.log(pets);