/**
 * PAKSTAY — HOME.JS
 * JavaScript for the homepage (index.html).
 * Handles: search form, guests counter, search tabs,
 *          animated number counters, wishlist hearts.
 */

$(document).ready(function () {

    /* ============================================================
       HERO BACKGROUND — Ken Burns effect
       Adds 'loaded' class to trigger the slow zoom-out CSS transition
    ============================================================ */

    // Small delay so the CSS transition plays visibly on load
    setTimeout(function () {
        $('#heroBg').addClass('loaded');
    }, 100);


    /* ============================================================
       SEARCH TABS — Hotels / Resorts / Guesthouses
       Clicking a tab makes it active (CSS handles the visual)
    ============================================================ */

    // Listen for click on any search tab button
    $('.search-tab').on('click', function () {
        // Remove 'active' from all tabs, then add it to the clicked one
        $('.search-tab').removeClass('active');
        $(this).addClass('active');
    });


    /* ============================================================
       GUESTS COUNTER — + / - buttons in the search form
       Keeps the count between 1 and 20.
    ============================================================ */

    var guestsCount = 2;  // Start with 2 guests

    // Decrease guests when the '-' button is clicked
    $('#guestsDown').on('click', function () {
        if (guestsCount > 1) {
            guestsCount--;
            $('#guestsCount').text(guestsCount);
        }
    });

    // Increase guests when the '+' button is clicked
    $('#guestsUp').on('click', function () {
        if (guestsCount < 20) {
            guestsCount++;
            $('#guestsCount').text(guestsCount);
        }
    });


    /* ============================================================
       SEARCH FORM — Set minimum dates and validate
       Check-in can't be in the past.
       Check-out must be after check-in.
    ============================================================ */

    // Get today's date formatted as YYYY-MM-DD (required for date inputs)
    var today = new Date().toISOString().split('T')[0];

    // Set the minimum selectable date for check-in to today
    $('#checkInInput').attr('min', today);
    $('#checkOutInput').attr('min', today);

    // When check-in date changes, update the minimum check-out date
    $('#checkInInput').on('change', function () {
        var checkInDate = $(this).val();
        if (checkInDate) {
            // Check-out must be at least 1 day after check-in
            var minCheckOut = new Date(checkInDate);
            minCheckOut.setDate(minCheckOut.getDate() + 1);
            var minCheckOutStr = minCheckOut.toISOString().split('T')[0];

            $('#checkOutInput').attr('min', minCheckOutStr);

            // If the existing check-out is before the new minimum, reset it
            if ($('#checkOutInput').val() && $('#checkOutInput').val() < minCheckOutStr) {
                $('#checkOutInput').val(minCheckOutStr);
            }
        }
    });

    // Handle search form submission
    $('#searchForm').on('submit', function (e) {
        e.preventDefault();  // Stop the page from reloading

        // Collect the search values
        var destination = $('#destinationInput').val();
        var checkIn     = $('#checkInInput').val();
        var checkOut    = $('#checkOutInput').val();
        var guests      = $('#guestsCount').text();

        // Basic validation — destination is required
        if (!destination) {
            alert('Please select a destination.');
            $('#destinationInput').focus();
            return;
        }

        // Build the query string and navigate to hotels listing page
        var queryString = '?dest=' + destination;
        if (checkIn)  queryString += '&checkIn='  + checkIn;
        if (checkOut) queryString += '&checkOut=' + checkOut;
        queryString += '&guests=' + guests;

        // Navigate to the hotels page with search parameters
        window.location.href = 'hotels.html' + queryString;
    });


    /* ============================================================
       STATS BAR — Show final values immediately (no animation)
    ============================================================ */

    // Set each stat number to its final value on page load
    $('.stat-number').each(function () {
        var $this    = $(this);
        var target   = parseFloat($this.data('target'));
        var decimals = parseInt($this.data('decimal')) || 0;
        $this.text(decimals ? target.toFixed(decimals) : target.toLocaleString());
    });


    /* ============================================================
       WISHLIST HEARTS — Toggle saved state on hotel cards
       Clicking the heart button saves/unsaves a hotel.
       (Placeholder — in future this will use AJAX to save server-side)
    ============================================================ */

    // Listen for click on ANY wishlist button using event delegation
    // (works even for dynamically loaded cards)
    $(document).on('click', '.hotel-wishlist', function (e) {
        e.preventDefault();  // Don't follow any link

        var $btn  = $(this);
        var $icon = $btn.find('i');

        if ($btn.hasClass('saved')) {
            // Currently saved → remove from wishlist
            $btn.removeClass('saved');
            $icon.removeClass('fas').addClass('far');  // Solid → outline heart

            // TODO: AJAX call to remove from wishlist
            // $.ajax({ url: 'api/wishlist/remove', method: 'POST', data: { hotelId: hotelId } });

        } else {
            // Not saved → add to wishlist
            $btn.addClass('saved');
            $icon.removeClass('far').addClass('fas');  // Outline → solid heart

            // Small "bounce" animation using jQuery
            $btn.animate({ marginTop: '-3px' }, 100).animate({ marginTop: '0' }, 100);

            // TODO: AJAX call to add to wishlist
            // $.ajax({ url: 'api/wishlist/add', method: 'POST', data: { hotelId: hotelId } });
        }
    });


    /* ============================================================
       DESTINATION CARDS — Add click navigation
       Clicking a destination card goes to hotels.html with that destination
    ============================================================ */

    // Find any destination cards that are divs (not <a> tags) and make them clickable
    $('.destination-card').not('a').on('click', function () {
        // In a real app, read the destination from a data attribute
        window.location.href = 'hotels.html';
    });

});
