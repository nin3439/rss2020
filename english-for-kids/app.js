const routes = {
    '/' : categories,
    '/actionA' : categories[0],
    '/actionB' : categories[1],
    '/actionC' : categories[2],
    '/adjective' : categories[3],
    '/animalsA' : categories[4],
    '/animalsB' : categories[5],
    '/clothes' : categories[6],
    '/emotions' : categories[7]
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

