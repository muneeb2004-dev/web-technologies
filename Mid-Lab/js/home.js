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
       FEATURED HOTELS CAROUSEL — Pure jQuery / Vanilla JS
       No external library. Infinite loop via card cloning.
       Responsive: 3 cards desktop | 2 tablet | 1 mobile.
       Prev/Next buttons (jQuery), live slide counter,
       auto-play every 5 s — pauses when mouse hovers a card.
    ============================================================ */

    var $viewport  = $('#hotelCarousel');
    var totalCards = $viewport.children('.hotel-card').length;  // 6 real cards
    var curIdx     = 0;      // 0-based index of the real card at the left edge
    var sliding    = false;
    var autoTimer  = null;
    var gap        = 28;     // pixel gap between cards (must match $track gap below)
    var vis, cw;             // visible card count and card pixel width

    /* --- 1. Force the viewport to clip its content (no CSS class needed) --- */
    $viewport.css({ overflow: 'hidden', display: 'block', position: 'relative', background: 'transparent' });

    /* --- 2. Create a flex track and move the real cards into it --- */
    /* Using inline styles means NO CSS cascade can interfere */
    var $track = $('<div id="hotelSliderTrack"></div>').css({
        display:    'flex',
        flexWrap:   'nowrap',
        willChange: 'transform',
        background: 'transparent'
    });
    // Pull every hotel-card out of the viewport and drop it into the track
    $viewport.children('.hotel-card').appendTo($track);
    $viewport.append($track);

    /* --- 3. Decide how many cards fit based on viewport width --- */
    function getVis() {
        var w = $(window).width();
        if (w < 640)  return 1;   // Mobile — 1 card
        if (w < 1024) return 2;   // Tablet — 2 cards
        return 3;                  // Desktop — 3 cards
    }

    /* --- 4. Build infinite-loop clones ---
       Layout in track after this runs (example with vis=3):
       [clone6][clone5][clone4] [card1][card2][card3][card4][card5][card6] [clone1][clone2][clone3]
       Prepended clones let us scroll left past card 1 seamlessly.
       Appended clones let us scroll right past card 6 seamlessly.       */
    function buildClones() {
        $track.find('.slide-clone').remove();
        var $real = $track.children('.hotel-card:not(.slide-clone)');
        // Clone last `vis` cards → place at the very start of the track
        $real.slice(-vis).clone().addClass('slide-clone').prependTo($track);
        // Clone first `vis` cards → place at the very end of the track
        $real.slice(0, vis).clone().addClass('slide-clone').appendTo($track);
    }

    /* --- 5. Size every card (real + clone) to fit vis cards with gaps --- */
    function sizeCards() {
        // Subtract total gap space then divide by number of visible cards
        cw = ($viewport.width() - (vis - 1) * gap) / vis;
        // Apply gap on the track and set each card's exact width (no padding)
        $track.css('gap', gap + 'px');
        $track.children().css({
            width:      cw + 'px',
            flexShrink: '0',
            boxSizing:  'border-box'
        });
    }

    /* --- 6. Translate the track so `curIdx` real card is leftmost ---
       Each slot is (cw + gap) wide; real cards start after `vis` prepended clones */
    function moveTo(animate) {
        var offset = -((curIdx + vis) * (cw + gap));
        $track.css('transition', animate ? 'transform 0.45s ease' : 'none');
        $track.css('transform', 'translateX(' + offset + 'px)');
    }

    /* --- 7. Update the "Showing X of 6" text ---
       Use modulo so it stays correct even while animating into clones      */
    function updateCounter() {
        var display = ((curIdx % totalCards) + totalCards) % totalCards + 1;
        $('#carouselCounter').text('Showing ' + display + ' of ' + totalCards);
    }

    /* --- 8. Navigate to the next card (infinite loop forwards) --- */
    function goNext() {
        if (sliding) return;
        sliding = true;
        curIdx++;
        moveTo(true);
        updateCounter();
        // After animation: if we've entered the appended clones, silently jump to real card 0
        $track.one('transitionend', function () {
            if (curIdx >= totalCards) { curIdx = 0; moveTo(false); }
            sliding = false;
        });
    }

    /* --- 9. Navigate to the previous card (infinite loop backwards) --- */
    function goPrev() {
        if (sliding) return;
        sliding = true;
        curIdx--;
        moveTo(true);
        updateCounter();
        // After animation: if we've entered the prepended clones, silently jump to last real card
        $track.one('transitionend', function () {
            if (curIdx < 0) { curIdx = totalCards - 1; moveTo(false); }
            sliding = false;
        });
    }

    /* --- 10. Auto-play: advance every 5 seconds --- */
    function startAuto() { autoTimer = setInterval(goNext, 5000); }
    function stopAuto()  { clearInterval(autoTimer); }

    /* --- 11. jQuery click handlers for Prev and Next buttons --- */
    // Previous button — stop timer, go back, restart timer from now
    $('#carouselPrev').on('click', function () { stopAuto(); goPrev(); startAuto(); });
    // Next button — stop timer, go forward, restart timer from now
    $('#carouselNext').on('click', function () { stopAuto(); goNext(); startAuto(); });

    /* --- 12. Pause auto-play while mouse is over any hotel card --- */
    // Hover enter — pause so user can read the card
    $(document).on('mouseenter', '#hotelCarousel .hotel-card', function () { stopAuto(); });
    // Hover leave — resume auto-play
    $(document).on('mouseleave', '#hotelCarousel .hotel-card', function () { startAuto(); });

    /* --- 13. Rebuild on window resize (responsive breakpoint changes) --- */
    $(window).on('resize', function () {
        var newVis = getVis();
        if (newVis !== vis) {
            // Breakpoint crossed — visible count changed, rebuild clones
            vis = newVis;
            if (curIdx >= totalCards) curIdx = 0;
            buildClones();
        }
        sizeCards();
        moveTo(false);   // Snap to correct position without animation
    });

    /* --- 14. Boot --- */
    vis = getVis();       // Get initial visible count
    buildClones();        // Build clones BEFORE sizing (so clones exist to be sized)
    sizeCards();          // Now size all cards including clones
    moveTo(false);        // Snap to starting position (no animation on first load)
    updateCounter();      // Show "Showing 1 of 6"
    startAuto();          // Begin 5-second auto-advance


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
