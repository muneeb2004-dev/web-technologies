/**
 * PAKSTAY — AUTH.JS
 * JavaScript for login.html and signup.html.
 * Handles: form validation, password visibility toggle,
 *          password strength meter, account type selection,
 *          social auth placeholders.
 */

$(document).ready(function () {

    /* ============================================================
       PASSWORD VISIBILITY TOGGLE — Show/Hide password text
       Clicking the eye icon switches input type between
       "password" (dots) and "text" (readable).
    ============================================================ */

    // Generic function for toggling any password field
    function setupPasswordToggle(toggleBtnId, inputId, iconId) {
        $('#' + toggleBtnId).on('click', function () {
            var $input = $('#' + inputId);
            var $icon  = $('#' + iconId);

            if ($input.attr('type') === 'password') {
                // Currently hidden → show it
                $input.attr('type', 'text');
                $icon.removeClass('fa-eye').addClass('fa-eye-slash');
            } else {
                // Currently visible → hide it
                $input.attr('type', 'password');
                $icon.removeClass('fa-eye-slash').addClass('fa-eye');
            }
        });
    }

    // Set up toggles for each password field
    setupPasswordToggle('toggleLoginPassword',   'loginPassword',    'toggleLoginIcon');
    setupPasswordToggle('toggleSignupPassword',  'signupPassword',   'toggleSignupIcon');
    setupPasswordToggle('toggleConfirmPassword', 'confirmPassword',  'toggleConfirmIcon');


    /* ============================================================
       PASSWORD STRENGTH METER (signup page only)
       Updates 4 colored segments as the user types.
       Strength is based on: length, numbers, uppercase, symbols.
    ============================================================ */

    $('#signupPassword').on('input', function () {
        var password = $(this).val();

        if (password.length === 0) {
            // Hide the meter if field is empty
            $('#passwordStrength').removeClass('visible');
            return;
        }

        // Show the meter
        $('#passwordStrength').addClass('visible');

        // Calculate strength score (0–4)
        var score = 0;
        if (password.length >= 8)                 score++;  // Decent length
        if (password.length >= 12)                score++;  // Good length
        if (/[0-9]/.test(password))               score++;  // Contains number
        if (/[A-Z]/.test(password))               score++;  // Contains uppercase
        if (/[^A-Za-z0-9]/.test(password))        score++;  // Contains symbol

        // Cap score at 4 for the 4 segments
        score = Math.min(score, 4);

        // Determine strength label and CSS class
        var strengthClass, strengthText;
        if (score <= 1) {
            strengthClass = 'weak';
            strengthText  = 'Weak';
        } else if (score <= 2) {
            strengthClass = 'medium';
            strengthText  = 'Fair';
        } else if (score <= 3) {
            strengthClass = 'medium';
            strengthText  = 'Good';
        } else {
            strengthClass = 'strong';
            strengthText  = 'Strong';
        }

        // Update label
        $('#strengthLabel')
            .text(strengthText)
            .attr('class', 'strength-label ' + strengthClass);

        // Update the 4 bar segments
        for (var i = 1; i <= 4; i++) {
            var $seg = $('#seg' + i);
            $seg.attr('class', 'strength-segment');  // Reset classes
            if (i <= score) {
                $seg.addClass(strengthClass);  // Color the filled segments
            }
        }
    });


    /* ============================================================
       ACCOUNT TYPE SELECTION (signup page)
       Visual toggle between "Guest" and "Hotel Owner" account types.
       Clicking a label highlights it.
    ============================================================ */

    // When the radio input value changes (via label click)
    $('input[name="accountType"]').on('change', function () {
        var selectedType = $(this).val();

        // Reset both type button styles
        $('#typeUserBtn, #typeOwnerBtn').css({
            'border-bottom-color': 'var(--outline-variant)',
            'background':          'var(--surface-low)'
        });

        // Highlight the selected one
        if (selectedType === 'user') {
            $('#typeUserBtn').css({
                'border-bottom-color': 'var(--primary)',
                'background':          'var(--secondary-container)'
            });
        } else {
            $('#typeOwnerBtn').css({
                'border-bottom-color': 'var(--primary)',
                'background':          'var(--secondary-container)'
            });
        }
    });

    // Trigger change on load to highlight the default (user)
    $('input[name="accountType"]:checked').trigger('change');


    /* ============================================================
       EMAIL VALIDATION — helper
    ============================================================ */

    // Returns true if the email looks valid
    function isValidEmail(email) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }


    /* ============================================================
       PHONE VALIDATION — Pakistani formats
       Accepts: 03001234567, +923001234567, 0300-1234567
    ============================================================ */

    function isValidPakPhone(phone) {
        var cleaned = phone.replace(/[\s\-]/g, '');
        return /^(\+92|0092|0)3[0-9]{9}$/.test(cleaned);
    }


    /* ============================================================
       SHOW / HIDE form error messages
    ============================================================ */

    function showError($input, $errorEl, message) {
        $input.addClass('error');
        $errorEl.text(message).addClass('visible');
    }

    function clearError($input, $errorEl) {
        $input.removeClass('error');
        $errorEl.removeClass('visible');
    }


    /* ============================================================
       LOGIN FORM VALIDATION & SUBMISSION
    ============================================================ */

    $('#loginForm').on('submit', function (e) {
        e.preventDefault();  // Stop default browser submission

        var email    = $('#loginEmail').val().trim();
        var password = $('#loginPassword').val();
        var isValid  = true;

        // Validate email
        if (!email || !isValidEmail(email)) {
            showError($('#loginEmail'), $('#emailError'), 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError($('#loginEmail'), $('#emailError'));
        }

        // Validate password (at least 8 characters)
        if (!password || password.length < 8) {
            showError($('#loginPassword'), $('#passwordError'), 'Password must be at least 8 characters.');
            isValid = false;
        } else {
            clearError($('#loginPassword'), $('#passwordError'));
        }

        if (!isValid) return;  // Stop if there are errors

        // Disable submit button to prevent double-submission
        var $submitBtn = $('#loginSubmit');
        $submitBtn.text('Signing In…').prop('disabled', true);

        // TODO: Replace with real AJAX login call
        /*
        $.ajax({
            url: 'api/auth/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email:      email,
                password:   password,
                rememberMe: $('#rememberMe').prop('checked')
            }),
            success: function(response) {
                // Login successful — redirect to homepage or dashboard
                window.location.href = response.redirect || 'index.html';
            },
            error: function(xhr) {
                $submitBtn.text('Sign In').prop('disabled', false);
                var msg = xhr.responseJSON && xhr.responseJSON.message
                          ? xhr.responseJSON.message
                          : 'Login failed. Please check your email and password.';
                alert(msg);
            }
        });
        */

        // Simulate success for demo purposes
        setTimeout(function () {
            alert('Login successful! (Demo — no backend connected yet)');
            $submitBtn.text('Sign In').prop('disabled', false);
            // window.location.href = 'index.html';  // Uncomment when backend is ready
        }, 1000);
    });


    /* ============================================================
       SIGNUP FORM VALIDATION & SUBMISSION
    ============================================================ */

    $('#signupForm').on('submit', function (e) {
        e.preventDefault();

        var firstName  = $('#firstName').val().trim();
        var lastName   = $('#lastName').val().trim();
        var email      = $('#signupEmail').val().trim();
        var phone      = $('#signupPhone').val().trim();
        var password   = $('#signupPassword').val();
        var confirm    = $('#confirmPassword').val();
        var agreedTerms = $('#agreeTerms').prop('checked');
        var isValid    = true;

        // Validate first name
        if (!firstName) {
            showError($('#firstName'), $('#firstNameError'), 'First name is required.');
            isValid = false;
        } else {
            clearError($('#firstName'), $('#firstNameError'));
        }

        // Validate last name
        if (!lastName) {
            showError($('#lastName'), $('#lastNameError'), 'Last name is required.');
            isValid = false;
        } else {
            clearError($('#lastName'), $('#lastNameError'));
        }

        // Validate email
        if (!email || !isValidEmail(email)) {
            showError($('#signupEmail'), $('#signupEmailError'), 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError($('#signupEmail'), $('#signupEmailError'));
        }

        // Validate phone (only if filled in)
        if (phone && !isValidPakPhone(phone)) {
            showError($('#signupPhone'), $('#signupPhoneError'), 'Please enter a valid Pakistani phone number.');
            isValid = false;
        } else {
            clearError($('#signupPhone'), $('#signupPhoneError'));
        }

        // Validate password strength
        if (!password || password.length < 8) {
            showError($('#signupPassword'), $('#signupPasswordError'), 'Password must be at least 8 characters.');
            isValid = false;
        } else {
            clearError($('#signupPassword'), $('#signupPasswordError'));
        }

        // Validate confirm password matches
        if (password !== confirm) {
            showError($('#confirmPassword'), $('#confirmPasswordError'), 'Passwords do not match.');
            isValid = false;
        } else {
            clearError($('#confirmPassword'), $('#confirmPasswordError'));
        }

        // Validate terms checkbox
        if (!agreedTerms) {
            $('#termsError').addClass('visible');
            isValid = false;
        } else {
            $('#termsError').removeClass('visible');
        }

        if (!isValid) return;

        // Disable button to prevent double-submission
        var $submitBtn = $('#signupSubmit');
        $submitBtn.text('Creating Account…').prop('disabled', true);

        var accountType = $('input[name="accountType"]:checked').val();

        // TODO: Replace with real AJAX registration call
        /*
        $.ajax({
            url: 'api/auth/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                firstName:   firstName,
                lastName:    lastName,
                email:       email,
                phone:       phone,
                password:    password,
                accountType: accountType
            }),
            success: function(response) {
                window.location.href = 'index.html';
            },
            error: function(xhr) {
                $submitBtn.text('Create Account').prop('disabled', false);
                var msg = xhr.responseJSON && xhr.responseJSON.message
                          ? xhr.responseJSON.message
                          : 'Registration failed. Please try again.';
                alert(msg);
            }
        });
        */

        // Simulate success for demo
        setTimeout(function () {
            alert('Account created successfully! (Demo — no backend connected yet)\n\nName: ' + firstName + ' ' + lastName + '\nEmail: ' + email + '\nAccount Type: ' + accountType);
            $submitBtn.text('Create Account').prop('disabled', false);
        }, 1000);
    });


    /* ============================================================
       REAL-TIME INLINE VALIDATION
       Validate each field as the user types/leaves (on blur)
       for a smooth user experience.
    ============================================================ */

    // Validate email on blur (when user leaves the field)
    $('#loginEmail, #signupEmail').on('blur', function () {
        var $this    = $(this);
        var errorId  = $this.is('#loginEmail') ? '#emailError' : '#signupEmailError';
        var email    = $this.val().trim();

        if (email && !isValidEmail(email)) {
            showError($this, $(errorId), 'Please enter a valid email address.');
        } else {
            clearError($this, $(errorId));
        }
    });

    // Validate confirm password matches as user types in confirm field
    $('#confirmPassword').on('input', function () {
        var password = $('#signupPassword').val();
        var confirm  = $(this).val();

        if (confirm && password !== confirm) {
            showError($(this), $('#confirmPasswordError'), 'Passwords do not match.');
        } else {
            clearError($(this), $('#confirmPasswordError'));
        }
    });


    /* ============================================================
       SOCIAL AUTH BUTTONS — Placeholder handlers
       These would redirect to Google/Facebook OAuth in production.
    ============================================================ */

    // When Google login button is clicked
    $('#googleLogin, #googleSignup').on('click', function () {
        // TODO: Redirect to backend OAuth endpoint
        // window.location.href = 'api/auth/google';
        alert('Google OAuth integration coming soon! (Requires backend setup)');
    });

    // When Facebook login button is clicked
    $('#facebookLogin, #facebookSignup').on('click', function () {
        // TODO: Redirect to backend OAuth endpoint
        // window.location.href = 'api/auth/facebook';
        alert('Facebook OAuth integration coming soon! (Requires backend setup)');
    });

});
