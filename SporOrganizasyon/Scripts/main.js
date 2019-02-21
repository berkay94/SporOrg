jQuery(document).ready(function ($) {
    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('header').height();
        $(window).on('scroll', {
            previousTop: 0
        },
            function () {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('header').hasClass('is-fixed')) {
                        $('header').addClass('is-visible');
                    } else {
                        $('header').removeClass('is-visible is-fixed');
                    }
                } else {
                    //if scrolling down...
                    $('header').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('header').hasClass('is-fixed')) $('header').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }

    //open/close primary navigation
    $('.nav-trigger').on('click', function () {
        $('.menu-icon').toggleClass('is-clicked');
        $('header').toggleClass('menu-is-open');

        //in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        if ($('.primary-nav').hasClass('is-visible')) {
            $('.primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $('body').removeClass('overflow-hidden');
            });
        } else {
            $('.primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                $('body').addClass('overflow-hidden');
            });
        }
    });

    // For Rounded Model
    // For Login
    var overlayNav = $('.overlay-nav').not('.second'),
        overlayContent = $('.overlay-content').not('.second'),
        navigation = $('.round-primary'),
        toggleNav = $('.round-trigger'),
        // For Register
        navigation2 = $('.round-second'),
        toggleNav2 = $('.round-trigger-second');

    //inizialize navigation and content layers
    layerInit();
    $(window).on('resize', function () {
        window.requestAnimationFrame(layerInit);
    });

    //For Login
    //open/close the menu and cover layers
    toggleNav.on('click', function () {
        toggleNav2.toggleClass('none');
        if (!toggleNav.hasClass('close-nav')) {
            //it means navigation is not visible yet - open it and animate navigation layer
            toggleNav.addClass('close-nav');

            overlayNav.children('span').velocity({
                translateZ: 0,
                scaleX: 1,
                scaleY: 1,
            }, 500, 'easeInCubic', function () {
                navigation.addClass('fade-in');
            });
            // Form Focus
            $("#q1").focus();
        } else {
            //navigation is open - close it and remove navigation layer
            toggleNav.removeClass('close-nav');

            overlayContent.children('span').velocity({
                translateZ: 0,
                scaleX: 1,
                scaleY: 1,
            }, 500, 'easeInCubic', function () {
                navigation.removeClass('fade-in');

                overlayNav.children('span').velocity({
                    translateZ: 0,
                    scaleX: 0,
                    scaleY: 0,
                }, 0);

                overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                    overlayContent.children('span').velocity({
                        translateZ: 0,
                        scaleX: 0,
                        scaleY: 0,
                    }, 0, function () {
                        overlayContent.removeClass('is-hidden')
                    });
                });
                if ($('html').hasClass('no-csstransitions')) {
                    overlayContent.children('span').velocity({
                        translateZ: 0,
                        scaleX: 0,
                        scaleY: 0,
                    }, 0, function () {
                        overlayContent.removeClass('is-hidden')
                    });
                }
            });
        }
    });

    //For Register
    //open/close the menu and cover layers
    toggleNav2.on('click', function () {
        toggleNav.toggleClass('none');
        if (!toggleNav2.hasClass('close-nav')) {
            //it means navigation is not visible yet - open it and animate navigation layer

            // For Register right 10%
            overlayNav.addClass("second");
            overlayContent.addClass("second");
            //
            toggleNav2.addClass('close-nav');

            overlayNav.children('span').velocity({
                translateZ: 0,
                scaleX: 1,
                scaleY: 1,
            }, 500, 'easeInCubic', function () {
                navigation2.addClass('fade-in');
            });
            // Form Focus
            //$("#q1").focus();
        } else {
            //navigation is open - close it and remove navigation layer
            toggleNav2.removeClass('close-nav');
            // Delay lazım
            setTimeout(function () { overlayNav.removeClass("second"); }, 1000);
            setTimeout(function () { overlayContent.removeClass("second"); }, 1000);

            overlayContent.children('span').velocity({
                translateZ: 0,
                scaleX: 1,
                scaleY: 1,
            }, 500, 'easeInCubic', function () {
                navigation2.removeClass('fade-in');

                overlayNav.children('span').velocity({
                    translateZ: 0,
                    scaleX: 0,
                    scaleY: 0,
                }, 0);

                overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                    overlayContent.children('span').velocity({
                        translateZ: 0,
                        scaleX: 0,
                        scaleY: 0,
                    }, 0, function () {
                        overlayContent.removeClass('is-hidden')
                    });
                });
                if ($('html').hasClass('no-csstransitions')) {
                    overlayContent.children('span').velocity({
                        translateZ: 0,
                        scaleX: 0,
                        scaleY: 0,
                    }, 0, function () {
                        overlayContent.removeClass('is-hidden')
                    });
                }
            });
        }
    });

    function layerInit() {
        var diameterValue = (Math.sqrt(Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2)) * 2);
        overlayNav.children('span').velocity({
            scaleX: 0,
            scaleY: 0,
            translateZ: 0,
        }, 50).velocity({
            height: diameterValue + 'px',
            width: diameterValue + 'px',
            top: -(diameterValue / 2) + 'px',
            left: -(diameterValue / 2) + 'px',
        }, 0);

        overlayContent.children('span').velocity({
            scaleX: 0,
            scaleY: 0,
            translateZ: 0,
        }, 50).velocity({
            height: diameterValue + 'px',
            width: diameterValue + 'px',
            top: -(diameterValue / 2) + 'px',
            left: -(diameterValue / 2) + 'px',
        }, 0);
    }

    var i = 1;
    var y = 0;
    var inputs = [];
    var input = $('.form-control');
    var u = $(".form-question").length;
    $(".flowbutton").on('click', function () {

        inputs[y] = input.eq(y).val();
        $(".form-question.visible").removeClass('visible');
        $(".form-question").eq(i).addClass('visible');
        $(".form-question:visible").find('.form-control').focus();
        i++;
        y++;
        console.log(inputs);
        if (i == u) {
            $('#flowbutton').removeClass('visible');
        }
    });



    $(document).on('submit', '.jspost', function (e) {
        e.preventDefault();
        var elem = $(this);
        $.ajax({
            cache: false,
            type: elem.attr('method'),
            url: elem.attr('action'),
            dataType: 'json',
            data: elem.serialize(),
            beforeSend: function () {
                console.log('form gönderiliyor');
            },
            success: function (result) {
                if (result.status == "success") {
                    alert(result.message);
                    console.log(result.name);
                    console.log(result);
                }
            },
            error: function (result) {
                console.log('hatalı');
                console.log(result);
            }
        });

    });

    $('.toenter').on('keydown', function (event) {
        if (event.which === 13) {
            if ($('#' + $(this).attr('targetbtn')).attr("type") == "submit") {
                $('#' + $(this).attr('targetbtn')).triggerHandler('click');
            }
            else {
                event.preventDefault();
                $('#' + $(this).attr('targetbtn')).triggerHandler('click');
            }
        }
    });

});
