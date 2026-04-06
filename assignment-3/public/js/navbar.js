// EVENT LISTENER: waiting for the entire page HTML to fully load before running any code
document.addEventListener('DOMContentLoaded', function() {

    // QUERY SELECTOR: selecting the hamburger button element from the DOM by its ID
    const hamburgerBtn = document.getElementById('hamburger-btn');
    
    // QUERY SELECTOR: selecting the navigation menu element from the DOM by its ID  
    const navMenu = document.getElementById('nav-menu');

    // EVENT LISTENER: listening for a click on the hamburger button
    // when clicked it will run the function below
    hamburgerBtn.addEventListener('click', function() {
    
        // TOGGLE CLASS: adding class 'menu-open' if it is not there
        // or removing it if it already exists - this opens and closes the menu
        navMenu.classList.toggle('menu-open');
        
        // TOGGLE CLASS: changing hamburger icon appearance when menu is open
        hamburgerBtn.classList.toggle('active');
    });

    // QUERY SELECTOR ALL: selecting ALL navigation link elements at once
    // returns a list of all elements matching this selector
    const navLinks = document.querySelectorAll('#nav-menu a');
    
    // FOR EACH: looping through every nav link one by one
    // and adding a click event to each one
    navLinks.forEach(function(link) {
    
        // EVENT LISTENER: listening for click on each individual nav link
        link.addEventListener('click', function() {
        
            // REMOVE CLASS: closing the menu when any nav link is clicked
            // this improves user experience on mobile
            navMenu.classList.remove('menu-open');
            hamburgerBtn.classList.remove('active');
        });
    });
});
