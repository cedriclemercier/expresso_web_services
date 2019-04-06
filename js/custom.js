// JavaScript Document

$(window).load(function () {
    "use strict";
    // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})




$(document).ready(function () {
    "use strict";

    // scroll menu
    var sections = $('.section'),
        nav = $('.navbar-fixed-top,footer'),
        nav_height = nav.outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height + 2
        }, 600);

        return false;
    });


    // Menu opacity
    if ($(window).scrollTop() > 80) {
        $(".navbar-fixed-top").addClass("bg-nav");
    } else {
        $(".navbar-fixed-top").removeClass("bg-nav");
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() > 80) {
            $(".navbar-fixed-top").addClass("bg-nav");
        } else {
            $(".navbar-fixed-top").removeClass("bg-nav");
        }
    });



    // Parallax
    var parallax = function () {
        $(window).stellar();
    };

    $(function () {
        parallax();
    });

    // AOS
    AOS.init({
        duration: 1200,
        once: true,
        disable: 'mobile'
    });

    //  isotope
    $('#projects').waitForImages(function () {
        var $container = $('.portfolio_container');
        $container.isotope({
            filter: '*',
        });

        $('.portfolio_filter a').click(function () {
            $('.portfolio_filter .active').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    animationEngine: "jquery"
                }
            });
            return false;
        });

    });

    //animatedModal
    $("#demo01,#demo02,#demo03,#demo04,#demo05,#demo06,#demo07,#demo08,#demo09").animatedModal();

    // Contact Form 	

    // validate contact form
    $(function () {
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: false
                },
                message: {
                    required: true
                }

            },
            messages: {
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                message: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        
                        $('#contact-form :input').attr('disabled', 'disabled');
                        $('#contact-form').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                           /* $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();*/
                        });
                         $('#contact-form').fadeOut();
                        $('.success-message').delay(1500).fadeIn();
                        /*
                        document.getElementById('contact-form').style.display = "none";
                        
                        $('#contact-form').addClass('hide');
                        $('.success-message').addClass('show');
                        */
                    },
                    error: function () {
                        $('#contact-form').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                    
                    
                });
            }
        });

    });
});


// Code for sliding forms tabs


var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("promotion-tab");
    x[n].style.display = "block";
    
    // ... and fix the Previous/Next buttons:
    if (n == 0 ) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    
    if (n==(x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    
    fixStepIndicator(n);
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("promotion-tab");
    // Exit the function if any field in the current tab is invalid:
    if ( n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        document.getElementsByClassName("promo-form").submit();
        return false;
    }
    
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("promotion-tab");
    y = x[currentTab].getElementsByTagName("input");
    
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:

        y[i].className += " invalid";
      // and set the current valid status to false
      
        valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}


function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}


        