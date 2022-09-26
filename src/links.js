const toggleBtn = document.getElementsByClassName('toggle-btn')[0];
const navBarLinks = document.getElementsByClassName('nav-bar-links')[0];


toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navBarLinks.classList.toggle('active')
})