/**
 * PAKSTAY — HOTELS.JS
 * JavaScript for the hotels listing page (hotels.html).
 * Handles: view toggle (grid/list), filter sidebar (collapsible groups,
 *          mobile toggle), price slider, sort select, filter checkboxes,
 *          pagination, AJAX placeholder for fetching results.
 */

$(document).ready(function () {

    /* ============================================================
       VIEW TOGGLE — Grid vs List layout
       Two buttons let the user switch between card grid and list view.
    ============================================================ */

    var $hotelsGrid = $('#hotelsGrid');
    var $hotelsList = $('#hotelsList');

    // When user clicks the GRID view button
    $('#gridViewBtn').on('click', function () {
        $hotelsGrid.show();
        $hotelsList.hide();
        // Update which button looks "active"
        $('#gridViewBtn').addClass('active');
        $('#listViewBtn').removeClass('active');
    });

    // When user clicks the LIST view button
    $('#listViewBtn').on('click', function () {
        $hotelsList.show();
        $hotelsGrid.hide();
        // Update active button state
        $('#listViewBtn').addClass('active');
        $('#gridViewBtn').removeClass('active');
    });


    /* ============================================================
       FILTER GROUPS — Collapsible sections in the sidebar
       Clicking a filter group title toggles it open/closed.
    ============================================================ */

    // Listen for click on any filter group title
    $('.filter-group-title').on('click', function () {
        // Find the parent .filter-group div
        var $group = $(this).closest('.filter-group');
        // Toggle the 'collapsed' class — CSS handles the animation
        $group.toggleClass('collapsed');
    });


    /* ============================================================
       MOBILE FILTER TOGGLE — Show/hide sidebar on small screens
    ============================================================ */

    // When mobile "Filters" button is clicked
    $('#filterToggle').on('click', function () {
        var $panel = $('#filterPanel');
        $panel.toggleClass('mobile-open');

        // Update the icon to show open/close state
        var $icon = $(this).find('.fa-chevron-down, .fa-chevron-up');
        $icon.toggleClass('fa-chevron-down fa-chevron-up');
    });


    /* ============================================================
       PRICE RANGE SLIDER
       Two range inputs control min and max price.
       The displayed values update in real-time as the slider moves.
    ============================================================ */

    // Format a number as "PKR 12,000" with thousands separator
    function formatPrice(value) {
        return 'PKR ' + parseInt(value).toLocaleString();
    }

    // Update the min price display as the slider moves
    $('#priceSliderMin').on('input', function () {
        var minVal = parseInt($(this).val());
        var maxVal = parseInt($('#priceSliderMax').val());

        // Ensure min doesn't exceed max
        if (minVal >= maxVal) {
            $(this).val(maxVal - 1000);
            minVal = maxVal - 1000;
        }

        $('#priceMin').text(formatPrice(minVal));
        applyFilters();  // Re-run filters whenever price changes
    });

    // Update the max price display as the slider moves
    $('#priceSliderMax').on('input', function () {
        var maxVal = parseInt($(this).val());
        var minVal = parseInt($('#priceSliderMin').val());

        // Ensure max doesn't go below min
        if (maxVal <= minVal) {
            $(this).val(minVal + 1000);
            maxVal = minVal + 1000;
        }

        $('#priceMax').text(formatPrice(maxVal));
        applyFilters();
    });


    /* ============================================================
       CHECKBOXES — Filters (stars, property type, amenities, rating)
       Any checkbox change triggers a new filter run.
    ============================================================ */

    // Listen for any filter checkbox change in the sidebar
    $(document).on('change', '.star-filter, .type-filter, .amenity-filter, .rating-filter', function () {
        applyFilters();
    });


    /* ============================================================
       CLEAR FILTERS BUTTON
       Resets all filter controls to their defaults.
    ============================================================ */

    $('#clearFilters').on('click', function () {
        // Uncheck all filter checkboxes
        $('.star-filter, .type-filter, .amenity-filter, .rating-filter').prop('checked', false);

        // Reset price sliders to full range
        $('#priceSliderMin').val(5000);
        $('#priceSliderMax').val(50000);
        $('#priceMin').text(formatPrice(5000));
        $('#priceMax').text(formatPrice(50000));

        // Re-apply (will show all results)
        applyFilters();
    });


    /* ============================================================
       SORT SELECT — Change the order of results
    ============================================================ */

    // When user changes the sort dropdown
    $('#sortSelect').on('change', function () {
        var sortValue = $(this).val();

        // TODO: AJAX call to fetch sorted results from backend
        // For now, just log the selected sort option
        console.log('Sort changed to:', sortValue);

        // Placeholder AJAX — ready for when backend is connected
        /*
        $.ajax({
            url: 'api/hotels/search',
            method: 'GET',
            data: {
                sort: sortValue,
                dest: $('#inlineDest').val()
            },
            success: function(response) {
                renderHotels(response.hotels);
            },
            error: function() {
                console.error('Failed to fetch sorted hotels');
            }
        });
        */
    });


    /* ============================================================
       INLINE SEARCH FORM (top bar on hotels page)
       Submits with the same logic as homepage search.
    ============================================================ */

    // Set minimum dates for the date inputs
    var today = new Date().toISOString().split('T')[0];
    $('#inlineCheckIn').attr('min', today);
    $('#inlineCheckOut').attr('min', today);

    // Update check-out minimum when check-in changes
    $('#inlineCheckIn').on('change', function () {
        var checkIn = $(this).val();
        if (checkIn) {
            var minOut = new Date(checkIn);
            minOut.setDate(minOut.getDate() + 1);
            $('#inlineCheckOut').attr('min', minOut.toISOString().split('T')[0]);
        }
    });

    // Handle inline search form submission
    $('#inlineSearchForm').on('submit', function (e) {
        e.preventDefault();

        var dest = $('#inlineDest').val();

        // TODO: Replace this with a real AJAX call to search API
        // For now, just reload the page with URL parameters
        var params = '?dest=' + encodeURIComponent(dest)
                   + '&checkIn='  + encodeURIComponent($('#inlineCheckIn').val())
                   + '&checkOut=' + encodeURIComponent($('#inlineCheckOut').val())
                   + '&guests='   + encodeURIComponent($('#inlineGuests').val());

        console.log('Searching with params:', params);
        // window.location.href = 'hotels.html' + params;
    });


    /* ============================================================
       PAGINATION — Page number buttons
    ============================================================ */

    // When a pagination number button is clicked
    $(document).on('click', '.page-btn:not(.dots):not(.arrow)', function () {
        // Remove active class from all page buttons, add to clicked one
        $('.page-btn').removeClass('active');
        $(this).addClass('active');

        var page = $(this).text().trim();

        // Enable/disable prev/next arrows based on current page
        $('#prevPage').prop('disabled', page === '1');
        $('#nextPage').prop('disabled', page === '12');  // Last page

        // Scroll back to top of results
        $('html, body').animate({ scrollTop: $('#hotelsGrid').offset().top - 160 }, 400);

        // TODO: AJAX call to load the new page of results
        /*
        $.ajax({
            url: 'api/hotels/search',
            data: { page: page },
            success: function(response) {
                renderHotels(response.hotels);
                $('#resultsCount').text(response.totalCount);
            }
        });
        */
    });

    // Previous page arrow
    $('#prevPage').on('click', function () {
        var $active = $('.page-btn.active');
        var $prev   = $active.prev('.page-btn:not(.arrow):not(.dots)');
        if ($prev.length) $prev.trigger('click');
    });

    // Next page arrow
    $('#nextPage').on('click', function () {
        var $active = $('.page-btn.active');
        var $next   = $active.next('.page-btn:not(.arrow):not(.dots)');
        if ($next.length) $next.trigger('click');
    });


    /* ============================================================
       APPLY FILTERS — Core filtering logic
       Called whenever any filter changes.
       In production this would be an AJAX call to the backend.
    ============================================================ */

    function applyFilters() {
        // Collect all active filters
        var selectedStars     = [];
        var selectedTypes     = [];
        var selectedAmenities = [];
        var priceMin          = parseInt($('#priceSliderMin').val());
        var priceMax          = parseInt($('#priceSliderMax').val());

        // Collect checked star values
        $('.star-filter:checked').each(function () {
            selectedStars.push($(this).val());
        });

        // Collect checked property types
        $('.type-filter:checked').each(function () {
            selectedTypes.push($(this).val());
        });

        // Collect checked amenities
        $('.amenity-filter:checked').each(function () {
            selectedAmenities.push($(this).val());
        });

        console.log('Applying filters:', {
            stars: selectedStars,
            types: selectedTypes,
            amenities: selectedAmenities,
            priceMin: priceMin,
            priceMax: priceMax
        });

        // TODO: Replace with AJAX when backend is ready
        /*
        $.ajax({
            url: 'api/hotels/search',
            method: 'GET',
            data: {
                stars:     selectedStars.join(','),
                types:     selectedTypes.join(','),
                amenities: selectedAmenities.join(','),
                priceMin:  priceMin,
                priceMax:  priceMax,
                sort:      $('#sortSelect').val()
            },
            beforeSend: function() {
                // Show loading state
                $('#hotelsGrid').addClass('loading');
            },
            success: function(response) {
                renderHotels(response.hotels);
                $('#resultsCount').text(response.count);
                $('#hotelsGrid').removeClass('loading');
            },
            error: function() {
                console.error('Filter request failed');
                $('#hotelsGrid').removeClass('loading');
            }
        });
        */
    }


    /* ============================================================
       WISHLIST HEARTS (delegated — works for all cards on this page)
    ============================================================ */

    $(document).on('click', '.hotel-wishlist, .hotel-list-wishlist', function (e) {
        e.preventDefault();
        var $btn  = $(this);
        var $icon = $btn.find('i');

        if ($btn.hasClass('saved')) {
            $btn.removeClass('saved');
            $icon.removeClass('fas').addClass('far');
        } else {
            $btn.addClass('saved');
            $icon.removeClass('far').addClass('fas');
            $btn.animate({ marginTop: '-3px' }, 100).animate({ marginTop: '0' }, 100);
        }
    });


    /* ============================================================
       PRE-FILL SEARCH FROM URL PARAMETERS
       If user came from homepage search, pre-fill the inline search bar.
    ============================================================ */

    // Parse URL query string into a key-value object
    function getUrlParams() {
        var params = {};
        var queryString = window.location.search.substring(1);
        var pairs = queryString.split('&');
        pairs.forEach(function (pair) {
            var parts = pair.split('=');
            if (parts[0]) {
                params[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
            }
        });
        return params;
    }

    var urlParams = getUrlParams();

    // If destination param exists, pre-select it in the dropdown
    if (urlParams.dest) {
        $('#inlineDest').val(urlParams.dest);
    }
    // Pre-fill dates if provided
    if (urlParams.checkIn)  $('#inlineCheckIn').val(urlParams.checkIn);
    if (urlParams.checkOut) $('#inlineCheckOut').val(urlParams.checkOut);
    if (urlParams.guests)   $('#inlineGuests').val(urlParams.guests);

});
