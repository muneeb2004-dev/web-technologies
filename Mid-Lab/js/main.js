/**
 * PAKSTAY — MAIN.JS
 * Shared JavaScript loaded on every page.
 * Handles: navbar scroll behavior, mobile menu, scroll-to-top button.
 *
 * Uses jQuery for all DOM operations.
 * Every event listener has a comment explaining what it does.
 */

$(document).ready(function () {

    /* ============================================================
       NAVBAR — Scroll Behavior
       On pages with a transparent hero, the navbar becomes "glass"
       after the user scrolls past 80px.
       On solid/inner pages, nothing changes (already solid class).
    ============================================================ */

    // Cache the navbar element so we don't look it up on every scroll event
    var $navbar = $('#navbar');

    // Only run the scroll-based color change if the navbar starts transparent
    if ($navbar.hasClass('transparent')) {

        // Listen for every scroll event on the window
        $(window).on('scroll', function () {
            // Check how far the user has scrolled from the top
            if ($(this).scrollTop() > 80) {
                // Add 'scrolled' class → triggers glass effect via CSS
                $navbar.addClass('scrolled').removeClass('transparent');
            } else {
                // User is back near the top → revert to transparent
                $navbar.addClass('transparent').removeClass('scrolled');
            }
        });
    }


    /* ============================================================
       MOBILE MENU — Open and Close
       Hamburger button toggles a full-screen overlay menu.
    ============================================================ */

    var $mobileMenu     = $('#mobileMenu');
    var $hamburgerBtn   = $('#hamburgerBtn');
    var $mobileClose    = $('#mobileClose');

    // When user clicks the hamburger icon → open the mobile menu
    $hamburgerBtn.on('click', function () {
        $mobileMenu.addClass('open').attr('aria-hidden', 'false');
        $hamburgerBtn.addClass('open');         // Animates lines to X shape
        $('body').css('overflow', 'hidden');    // Prevent background scroll
    });

    // When user clicks the X button → close the mobile menu
    $mobileClose.on('click', function () {
        closeMobileMenu();
    });

    // When user clicks a mobile nav link → close the menu
    // Using .on() delegation so dynamically added links also work
    $mobileMenu.on('click', '.mobile-nav-link', function () {
        closeMobileMenu();
    });

    // Close mobile menu when pressing the Escape key
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $mobileMenu.hasClass('open')) {
            closeMobileMenu();
        }
    });

    // Helper function — reusable close logic
    function closeMobileMenu() {
        $mobileMenu.removeClass('open').attr('aria-hidden', 'true');
        $hamburgerBtn.removeClass('open');
        $('body').css('overflow', '');  // Restore scrolling
    }


    /* ============================================================
       SCROLL-TO-TOP BUTTON
       Appears after user scrolls 400px down.
       Smoothly scrolls back to top on click.
    ============================================================ */

    var $scrollTopBtn = $('#scrollTop');

    // Show/hide the button based on scroll position
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 400) {
            $scrollTopBtn.addClass('visible');
        } else {
            $scrollTopBtn.removeClass('visible');
        }
    });

    // Scroll back to top when button is clicked
    $scrollTopBtn.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);  // Animated scroll in 500ms
    });


    /* ============================================================
       ACTIVE NAV LINK HIGHLIGHTING
       Adds 'active' class to the nav link matching the current page.
    ============================================================ */

    // Get just the filename part of the current URL (e.g., "hotels.html")
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Loop through each nav link and check if its href matches the current page
    $('.nav-link').each(function () {
        var linkHref = $(this).attr('href');
        if (linkHref === currentPage) {
            $(this).addClass('active');
        }
    });

});
