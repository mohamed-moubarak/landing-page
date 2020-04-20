/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const sections = document.querySelectorAll('section');
const scrollTopAnchor = document.querySelector('a.scroll-top');

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

// check if element is near the top of viewport
const isInViewport = (element) => {
    var elementBounding = element.getBoundingClientRect();
    return (
        elementBounding.top >= -200 &&
        elementBounding.left >= 0 &&
        elementBounding.bottom <= (window.innerHeight + 300 || document.documentElement.clientHeight + 300) &&
        elementBounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
const buildMainNav = () => {
    const ul = document.querySelector('ul#navbar__list');
    ul.style.visibility = 'hidden';
    let li, a;
    for (const section of sections) {
        li = document.createElement('li');
        a = document.createElement('a');
        a.textContent = section.getAttribute('data-nav');
        a.href = `#${section.getAttribute('id')}`;
        a.id = `nav-${section.getAttribute('id')}`;
        a.setAttribute('class', 'menu__link');

        li.appendChild(a);
        ul.appendChild(li);
    }
    ul.style.visibility = 'visible';
};

// Add class 'active' to section/nav when near top of viewport
const activateElement = (element) => {
    element.classList.add('active');
};

// Remove class 'active' from section/nav when not in viewport
const deactivateElement = (element) => {
    element.classList.remove('active');
};

// Scroll to anchor ID using scrollToElement event
const scrollToElement = (element) => {
    element.scrollIntoView({
        behavior: 'smooth'
    });
};

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
document.addEventListener('DOMContentLoaded', () => {
    buildMainNav();
});

// Scroll to section on link click
document.querySelector('ul#navbar__list').addEventListener('click', (event) => {
    if (event.target.nodeName === 'A' && event.target.className === 'menu__link') {
        event.preventDefault();
        let selectedSection = document.querySelector(event.target.getAttribute('href'));
        scrollToElement(selectedSection);
    }
});

// Set sections as active
document.addEventListener('scroll', () => {
    let navLink;
    if (window.pageYOffset >= 0 && window.pageYOffset < 250) {
        navLink = document.querySelector(`a#nav-${sections[0].getAttribute('id')}`);
        activateElement(navLink);
        activateElement(sections[0]);
        scrollTopAnchor.style.opacity = '0';
        scrollTopAnchor.style.visibility = 'hidden';
    } else {
        scrollTopAnchor.style.visibility = 'visible';
        scrollTopAnchor.style.opacity = '1';
        for (const section of sections) {
            navLink = document.querySelector(`a#nav-${section.getAttribute('id')}`);
            if (isInViewport(section)) {
                activateElement(navLink);
                activateElement(section);
            } else {
                deactivateElement(navLink);
                deactivateElement(section);
            }
        }
    }
});

// Scroll window top
scrollTopAnchor.addEventListener('click', () => window.scroll({
    top,
    behavior: 'smooth'
}));