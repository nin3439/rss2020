const menuButton= document.querySelector('.menu-button');
const navbar = document.querySelector('.menu');
const switchButton = document.querySelector('.check');
const trainPart = document.querySelector('.train');
const playPart = document.querySelector('span:first-child');
console.log(playPart)


menuButton.addEventListener('click', () => {
    navbar.classList.toggle('toggle');
})

switchButton.addEventListener('cleck', () => {
    trainPart.classList.toggle('none');
    playPart.classList.add('none');
})

const routes = {
    '/' : container.innerHTML,
    '/actionA' : newArr[0],
    '/actionB' : newArr[1],
    '/actionC' : newArr[2],
    '/adjective' : newArr[3],
    '/animalsA' : newArr[4],
    '/animalsB' : newArr[5],
    '/clothes' : newArr[6],
    '/emotions' : newArr[7]
};

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    )
    rootDiv.innerHTML = routes[pathname]
}

window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname]
};




