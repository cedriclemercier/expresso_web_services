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
                 service1: {
                    required: true
                },
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true
                },
                phone: {
                    required: true
                },
                message: {
                    required: true
                }

            },
            messages: {
                service: {
                    required: "This field is required"
                },
                name: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                phone: {
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
    
    
    $(function () {
        $('#promo-form').validate({
            rules: {
                name1: {
                    required: true,
                    minlength: 2
                },
                email1: {
                    required: true
                },
                phone1: {
                    required: true
                },
                message1: {
                    required: true
                }

            },
            messages: {
                name1: {
                    required: "This field is required",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "This field is required"
                },
                phone1: {
                    required: "This field is required"
                },
                message1: {
                    required: "This field is required"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        
                        $('#promo-form :input').attr('disabled', 'disabled');
                        $('#promo-form').fadeTo("slow", 1, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                           /* $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();*/
                        });
                         $('#promo-form').fadeOut();
                        $('.success-message').delay(1500).fadeIn();
                        /*
                        document.getElementById('contact-form').style.display = "none";
                        
                        $('#contact-form').addClass('hide');
                        $('.success-message').addClass('show');
                        */
                    },
                    error: function () {
                        $('#promo-form').fadeTo("slow", 1, function () {
                            $('#error').fadeIn();
                        });
                    }
                    
                    
                });
            }
        });

    });
    
    
    
});



const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];
   
    // Check if deleting
    if(this.isDeleting) {
        // Remove char
       this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    
    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
    
    // Initial Type Speed
    let typeSpeed = 200;
    
    if(this.isDeleting) {
        typeSpeed /= 2;
    }
    
    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Moive to next word
        this.wordIndex++;
        //Pause before start typing
        typeSpeed = 500;
    }
    
    setTimeout(() => this.type(), typeSpeed)
}

// Init on DOM Load

document.addEventListener('DOMContentLoaded', init);

// Init App

function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    
    //Init TypeWriter
    
    new TypeWriter(txtElement, words, wait);
}