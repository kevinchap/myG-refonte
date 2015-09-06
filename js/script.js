"use strict";

$(function(){

    // LOADER
    var loaderAnim = new TimelineMax();
    loaderAnim.to("#circle-loader", 3, {css:{height: '100%'}, ease:Linear.none})
        .to("#path-loader", 2, {css:{height: '100%'}, ease:Linear.none}, "-=2.5")
        .to("#loader-container", 0.8, {y:-200, ease:Linear.none})
        .to("#loader", 0.8, {y:-$(window).innerHeight(), ease:Quad.easeInOut,
        onComplete:function(){
            $('body').removeClass('noscroll');
        }}, "-=1");

    // Set padding top body && scroll header anim
    $('body.home, body.a-propos, body.expertises, body.solutions, body.evenement').css('padding-top', $(window).innerHeight()+'px');

    if($('body').hasClass('home') || $('body').hasClass('a-propos') || $('body').hasClass('expertises') || $('body').hasClass('solutions') || $('body').hasClass('evenement')){
        var controller = new ScrollMagic.Controller();
        var scene = new ScrollMagic.Scene({triggerElement: "#headerAnimTrigger", triggerHook: 'onEnter', duration: $(window).innerHeight()})
                    .setTween("header", {alpha: 0})
                    .addTo(controller);
    }

    // TRANSITION PAGE ANIM
    $('a').click(function(event){
        // if(isPageAllowed(event.target.getAttribute("href"))){
            launchBorderAnimOut(event.target.getAttribute("href"));
            return false;
        // }
    });

    // function isPageAllowed(redirectUrl){
    //     console.log()
    // }

    function getBaseURL(){
       return location.protocol + "//" + location.hostname + 
          (location.port && ":" + location.port) + "/";
    }

    function launchBorderAnimOut(redirectUrl){
        var url = redirectUrl;
        $('#borderAnim').css({
           'display' : 'block',
           'width' : $('nav ul li.current').width()+'px',
           'left' : $('nav ul li.current').offset().left+'px',
           'background-color' : $('nav ul li.current a').css("color")
        });
        var borderAnimOut = new TimelineMax();
        borderAnimOut.to("#borderAnim", 1, {css:{width: '100%', left: '0'}, ease:Quad.easeInOut,
            onComplete:function(){
                if(url !== null){
                    window.location.replace(getBaseURL()+'/myG/My%20fly%20-%20refonte/'+url);
                }else{
                    window.location.replace(getBaseURL()+'/myG/My%20fly%20-%20refonte/');
                }
                // if(url !== null){
                //     window.location.replace(getBaseURL()+'myGrefonte/'+url);
                // }else{
                //     window.location.replace(getBaseURL()+'myGrefonte/');
                // }
            }});
    }

    // function getBaseURL () {
    //     var baseURL = "";
    //     var baseDocument = "index.html";

    //     if (document.getElementsByTagName('base').length > 0) {
    //         baseURL = document.getElementsByTagName('base')[0].href.replace(baseDocument, "");
    //     } else {
    //         baseURL = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
    //     }

    //     return baseURL;
    // }

    // SCROLL TO FIRST SECTION
    if($('a.scrollTo').length>0){
        $('a.scrollTo').click(function(){
            $('html, body').animate({
                scrollTop:$('section.scrollTo').offset().top
            }, 'slow');
            return false;
        });
    }

    if($(window).innerWidth()>1024 && $('body').hasClass('article')){
        changeLeftArticleButtons();
        $(window).resize(function(){
            changeLeftArticleButtons();
        });
        function changeLeftArticleButtons(){
            $('.article-content .buttons').css('left',$('.article-content .content-large.business').offset().left+30+'px'); 
        }
    }

    if($('.article-content .buttons').length>0){
       $('.article-content .buttons').css('top',$('.article-content').offset().top+60+'px'); 
    }
    // nav background change on scroll
	$(window).scroll(function (event) {
        if($(window).scrollTop()>0){
            $('nav').addClass('on');
        }else{
            $('nav').removeClass('on');
        }
        if($('.article-content .buttons').length>0 && $(window).innerWidth()>1024){
            if($(window).scrollTop()>=479){
                $('.article-content .buttons').css('position', 'fixed');
                $('.article-content .buttons').css('top', '139px');
                if($(window).scrollTop()>=$('.article .list').offset().top-320){
                    $('.article-content .buttons').css('position', 'absolute');
                    $('.article-content .buttons').css('top', $('.article .list').offset().top-180+'px');
                }
            }else{
                $('.article-content .buttons').css('position', 'absolute');
                $('.article-content .buttons').css('top', $('.article-content').offset().top+60+'px');
            }
        }
    });

    // menu responsive and menu-button animation
    if($('.menu-button')){
        $('.menu-button').click(function(){
            $('nav').toggleClass('active');
            if($(this).hasClass('active')){
                $(this).removeClass('rotate');
                setTimeout(function(el){$(el).removeClass('active');},500, this);
            }else{
                $(this).addClass('active');
                setTimeout(function(el){$(el).addClass('rotate');},500, this);
            }
        }); 
    }

    // HOME TEMOIGNAGE SLIDER
        // puce navigation
        $('section.four ul li .puce').click(function(){
            if($(this).parent().hasClass('na')){
                $('section.four ul li').addClass('na');
                $(this).parent().removeClass('na');
                var slideClass = $(this).parent().attr('class');
                $('.slide').addClass('na');
                $('.slide').removeClass('active');
                if($('.slide#'+slideClass)){
                    $('.back-four').addClass('na');
                    $('#back-four-'+slideClass).removeClass('na');
                    $('.slide#'+slideClass).removeClass('na');
                    $('.slide#'+slideClass).addClass('active');
                }
            }
        });
        // button arrow navigation
        // $('section.four .control').click(function(){
        //     var activeSlideId = parseInt($('.slide.active').attr('data-id'));
        //     if($(this).hasClass('prev')){
        //         activeSlideId--;
        //     }else{
        //         activeSlideId++;
        //     }
        //     if($('#slide'+activeSlideId).length>0){
        //         $('section.four ul li').addClass('na');
        //         $('section.four ul li.slide'+activeSlideId).removeClass('na');
        //         $('.slide').addClass('na');
        //         $('.slide').removeClass('active');
        //         $('#slide'+activeSlideId).removeClass('na');
        //         $('#slide'+activeSlideId).addClass('active');
        //     }
        // });

    // SUBMIT BUTTON ANIMATION
    $('section.five form').submit(function () {
        var that = this;
        $(this).find('input[type="submit"]').addClass('active');
        $(this).find('.submit-anim').addClass('active');
        setTimeout(function(){
            $(that).find('input[type="submit"]').removeClass('active');
            $(that).find('.submit-anim').removeClass('active');
        },4500);
        return false;
    });

    // SLIDER TEAM
    var delta = $('section .team-slider').width()*2;
    function launchSlideTeam(dir){
        if(dir){
            TweenMax.to($('section .team-slider .back-team'), 120, {x:-delta, ease:Linear.easeNone,
            onComplete:function(){
                launchSlideTeam(false);
            }}); 
        }else{
            TweenMax.to($('section .team-slider .back-team'), 120, {x:0, ease:Linear.easeNone,
            onComplete:function(){
                launchSlideTeam(true);
            }});
        }
    }
    if($('section .team-slider .back-team').length>0){
        launchSlideTeam(true);
    }

    // GALERIE REFERENCE CLICK BUTTON
    $('section.six .references-galerie .cross').click(function(){
        $('section.six .references-galerie li').removeClass('active');
        $(this).parent().parent().parent().parent().addClass('active');
    });
    $('section.six .references-galerie .close').click(function(){
        $(this).parent().parent().parent().parent().removeClass('active');
    });

    // FILTERS BLOG ANIMATION
    if($('.blog .articles .articles-categories li a').length>0){
        $('.blog .articles .articles-categories li a').click(function(){
            $('.blog .articles .articles-categories li a').addClass('nc');
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                if($('.blog .articles .articles-categories li a.active').length==0){
                    $('.blog .articles .articles-categories li a').removeClass('nc');
                }
            }else{
                $(this).addClass('active');
            }
        });
    }

});