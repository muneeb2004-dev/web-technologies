/**
 * PAKSTAY — HOTEL-DETAILS.JS
 * JavaScript for the hotel details page (hotel-details.html).
 * Handles: tab navigation, image gallery/lightbox, booking widget
 *          (date picker, price calculation), read more toggle,
 *          room selection, review bar animations.
 */

$(document).ready(function () {

    /* ============================================================
       DETAIL TABS — Overview / Rooms / Amenities / Reviews / Location
       Clicking a tab shows its panel and hides the others.
    ============================================================ */

    // Listen for click on any tab button
    $('.detail-tab').on('click', function () {
        var panelId = $(this).data('panel');  // The panel ID is stored in data-panel

        // Remove active state from all tabs
        $('.detail-tab').removeClass('active');
        // Add active to the clicked tab
        $(this).addClass('active');

        // Hide all panels, then show only the matching one
        $('.detail-panel').removeClass('active');
        $('#' + panelId).addClass('active');

        // Scroll to the tab area so the panel is visible
        $('html, body').animate({
            scrollTop: $('.detail-tabs').offset().top - 100
        }, 300);
    });


    /* ============================================================
       IMAGE GALLERY — Click thumbnails to change main image
    ============================================================ */

    // Store gallery images (in production these would come from the server)
    var galleryImages = [
        'https://picsum.photos/seed/pc-lhr-main/1200/800',
        'https://picsum.photos/seed/pc-lhr-room/1200/800',
        'https://picsum.photos/seed/pc-lhr-pool/1200/800',
        'https://picsum.photos/seed/pc-lhr-lobby/1200/800',
        'https://picsum.photos/seed/pc-lhr-restaurant/1200/800'
    ];
    var currentImageIndex = 0;

    // When user clicks a thumbnail, update the main image
    $('.gallery-thumb').on('click', function () {
        var index = parseInt($(this).data('index'));
        if (!isNaN(index)) {
            updateMainImage(index);
        }
    });

    // Helper to update the main gallery image
    function updateMainImage(index) {
        currentImageIndex = index;
        $('#mainGalleryImg').attr('src', galleryImages[index]);
    }


    /* ============================================================
       LIGHTBOX — Full-screen photo gallery
       Opens when clicking the main image or "See all photos"
    ============================================================ */

    var $lightbox = $('#lightbox');

    // Open lightbox when clicking the main gallery image
    $('#galleryMain').on('click', function () {
        openLightbox(currentImageIndex);
    });

    // Open lightbox when clicking "See all photos" overlay
    $('#galleryMoreBtn').on('click', function () {
        openLightbox(0);
    });

    // Open lightbox at a specific image index
    function openLightbox(index) {
        currentImageIndex = index;
        $('#lightboxImg').attr('src', galleryImages[index]);
        updateLightboxCounter();
        $lightbox.addClass('open');
        $('body').css('overflow', 'hidden');  // Prevent background scroll
    }

    // Close lightbox when clicking the X button
    $('#lightboxClose').on('click', function () {
        closeLightbox();
    });

    // Close lightbox when clicking outside the image
    $lightbox.on('click', function (e) {
        // Only close if clicking the backdrop, not the image/buttons
        if ($(e.target).is($lightbox)) {
            closeLightbox();
        }
    });

    // Close lightbox with Escape key
    $(document).on('keydown', function (e) {
        if (!$lightbox.hasClass('open')) return;

        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowLeft')   lightboxPrev();
        if (e.key === 'ArrowRight')  lightboxNext();
    });

    // Previous image in lightbox
    $('#lightboxPrev').on('click', function () {
        lightboxPrev();
    });

    // Next image in lightbox
    $('#lightboxNext').on('click', function () {
        lightboxNext();
    });

    function lightboxPrev() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        $('#lightboxImg').attr('src', galleryImages[currentImageIndex]);
        updateLightboxCounter();
    }

    function lightboxNext() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        $('#lightboxImg').attr('src', galleryImages[currentImageIndex]);
        updateLightboxCounter();
    }

    // Update "1 / 5" counter in lightbox
    function updateLightboxCounter() {
        $('#lightboxCounter').text((currentImageIndex + 1) + ' / ' + galleryImages.length);
    }

    function closeLightbox() {
        $lightbox.removeClass('open');
        $('body').css('overflow', '');
    }


    /* ============================================================
       WISHLIST BUTTON (gallery area)
       Toggle the heart save button on the hotel detail page.
    ============================================================ */

    $('#wishlistBtn').on('click', function () {
        var $icon = $(this).find('i');
        $(this).toggleClass('saved');
        // Toggle between outline and solid heart icon
        $icon.toggleClass('far fas');
    });


    /* ============================================================
       READ MORE / LESS — Hotel description
       Expands the truncated hotel description.
    ============================================================ */

    var isExpanded = false;

    // When "Read More" button is clicked
    $('#readMoreBtn').on('click', function () {
        var $more = $('#hotelDescMore');

        if (!isExpanded) {
            // Show the hidden part of the description
            $more.slideDown(300);
            $(this).html('Show Less <i class="fas fa-chevron-up"></i>');
            isExpanded = true;
        } else {
            // Hide it again
            $more.slideUp(300);
            $(this).html('Read More <i class="fas fa-chevron-down"></i>');
            isExpanded = false;
        }
    });


    /* ============================================================
       BOOKING WIDGET — Date picker, price calculation
    ============================================================ */

    // Base prices per room type
    var roomPrices = {
        'deluxe':   25000,
        'superior': 35000,
        'suite':    75000
    };

    // Set minimum dates (same logic as other pages)
    var today = new Date().toISOString().split('T')[0];
    $('#bookingCheckIn').attr('min', today);
    $('#bookingCheckOut').attr('min', today);

    // Update checkout minimum and recalculate price when check-in changes
    $('#bookingCheckIn').on('change', function () {
        var checkIn = $(this).val();
        if (checkIn) {
            var minOut = new Date(checkIn);
            minOut.setDate(minOut.getDate() + 1);
            var minOutStr = minOut.toISOString().split('T')[0];
            $('#bookingCheckOut').attr('min', minOutStr);

            // If checkout is before new check-in, update it
            if ($('#bookingCheckOut').val() < minOutStr) {
                $('#bookingCheckOut').val(minOutStr);
            }
        }
        calculatePrice();
    });

    // Recalculate price when check-out changes
    $('#bookingCheckOut').on('change', function () {
        calculatePrice();
    });

    // Recalculate price when room type changes
    $('#bookingRoom').on('change', function () {
        calculatePrice();
        // Update the price shown in the header
        var roomType = $(this).val();
        var price    = roomPrices[roomType];
        if (price) {
            $('.booking-price-display').text('PKR ' + price.toLocaleString());
        }
    });


    /* ============================================================
       BOOKING GUESTS COUNTER (in the booking sidebar)
    ============================================================ */

    var bookingGuests = 2;

    // Decrease guests
    $('#bookingGuestsDown').on('click', function () {
        if (bookingGuests > 1) {
            bookingGuests--;
            $('#bookingGuestsCount').text(bookingGuests);
        }
    });

    // Increase guests
    $('#bookingGuestsUp').on('click', function () {
        if (bookingGuests < 10) {
            bookingGuests++;
            $('#bookingGuestsCount').text(bookingGuests);
        }
    });


    /* ============================================================
       PRICE CALCULATION
       Calculates: rooms × nights, service charge, grand total
    ============================================================ */

    function calculatePrice() {
        var checkIn  = $('#bookingCheckIn').val();
        var checkOut = $('#bookingCheckOut').val();
        var roomType = $('#bookingRoom').val();

        if (!checkIn || !checkOut) return;

        // Calculate number of nights between the two dates
        var checkInDate  = new Date(checkIn);
        var checkOutDate = new Date(checkOut);
        var nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        if (nights < 1) return;

        // Get room price based on selected room type
        var pricePerNight = roomPrices[roomType] || 25000;
        var roomTotal     = pricePerNight * nights;
        var serviceCharge = Math.round(roomTotal * 0.10);  // 10% service charge
        var grandTotal    = roomTotal + serviceCharge;

        // Helper to format numbers as PKR 25,000
        function fmt(n) { return 'PKR ' + n.toLocaleString(); }

        // Update the price breakdown display
        $('#nightCount').text(nights);
        $('#roomTotal').text(fmt(roomTotal));
        $('#serviceCharge').text(fmt(serviceCharge));
        $('#grandTotal').text(fmt(grandTotal));

        // Update the label to show price × nights
        var $firstRow = $('#priceBreakdown .price-row:first');
        $firstRow.find('span:first').html(
            fmt(pricePerNight) + ' &times; ' + nights + ' night' + (nights > 1 ? 's' : '')
        );
    }


    /* ============================================================
       BOOKING FORM SUBMISSION
    ============================================================ */

    $('#bookingForm').on('submit', function (e) {
        e.preventDefault();  // Don't reload the page

        var checkIn  = $('#bookingCheckIn').val();
        var checkOut = $('#bookingCheckOut').val();
        var roomType = $('#bookingRoom').val();

        // Validate required fields
        if (!checkIn) {
            alert('Please select a check-in date.');
            $('#bookingCheckIn').focus();
            return;
        }
        if (!checkOut) {
            alert('Please select a check-out date.');
            $('#bookingCheckOut').focus();
            return;
        }

        // TODO: Replace with real booking AJAX call to backend
        /*
        $.ajax({
            url: 'api/bookings/create',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                hotelId:  'pearl-continental-lahore',
                roomType: roomType,
                checkIn:  checkIn,
                checkOut: checkOut,
                guests:   bookingGuests
            }),
            success: function(response) {
                // Redirect to booking confirmation page
                window.location.href = 'booking-confirmation.html?id=' + response.bookingId;
            },
            error: function(xhr) {
                alert('Booking failed. Please try again or contact support.');
            }
        });
        */

        // For now, just show a confirmation alert
        alert('Booking request received! In production, this would redirect to a payment/confirmation page.\n\nDetails:\nRoom: ' + roomType + '\nCheck-in: ' + checkIn + '\nCheck-out: ' + checkOut + '\nGuests: ' + bookingGuests);
    });


    /* ============================================================
       ROOM SELECT BUTTON
       "Select Room" buttons on the Rooms tab pre-fill the booking widget
    ============================================================ */

    // Listen for click on any "Select Room" button
    $(document).on('click', '.btn:contains("Select Room")', function () {
        // Find the room type from the closest parent room-card
        var $card     = $(this).closest('.room-card');
        var roomType  = $card.find('.room-type-tag').text().trim().toLowerCase();

        // Map display text to select values
        var typeMap = { 'standard': 'deluxe', 'premium': 'superior', 'suite': 'suite' };
        var selectVal = typeMap[roomType] || 'deluxe';

        // Set the room select in the booking widget
        $('#bookingRoom').val(selectVal);

        // Switch to overview tab (which is where booking is visible)
        $('.detail-tab[data-panel="overview"]').trigger('click');

        // Scroll to booking sidebar
        $('html, body').animate({
            scrollTop: $('.booking-card').offset().top - 100
        }, 400);

        // Recalculate price with new room selection
        calculatePrice();

        // Trigger room change to update header price display
        $('#bookingRoom').trigger('change');
    });


    /* ============================================================
       REVIEW BAR ANIMATIONS
       Animates the colored fill bars when the Reviews tab is opened.
    ============================================================ */

    var reviewBarsAnimated = false;

    // Watch for when the Reviews tab becomes active
    $('.detail-tab[data-panel="reviews"]').on('click', function () {
        if (!reviewBarsAnimated) {
            reviewBarsAnimated = true;

            // Briefly reset all bars to 0, then animate to their data width
            setTimeout(function () {
                $('.review-bar-fill').each(function () {
                    var targetWidth = $(this).attr('style').match(/width:(\d+%)/);
                    if (targetWidth) {
                        $(this)
                            .css('width', '0')
                            .animate({ width: targetWidth[1] }, 800);
                    }
                });
            }, 100);
        }
    });

});
