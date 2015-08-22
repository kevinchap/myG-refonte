"use strict";

$(function(){
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
                $('.article-content .buttons').css('left', '158px');
            }else{
                $('.article-content .buttons').css('position', 'absolute');
                $('.article-content .buttons').css('top', '60px');
                $('.article-content .buttons').css('left', '30px');
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
        $('section.four .control').click(function(){
            var activeSlideId = parseInt($('.slide.active').attr('data-id'));
            if($(this).hasClass('prev')){
                activeSlideId--;
            }else{
                activeSlideId++;
            }
            if($('#slide'+activeSlideId).length>0){
                $('section.four ul li').addClass('na');
                $('section.four ul li.slide'+activeSlideId).removeClass('na');
                $('.slide').addClass('na');
                $('.slide').removeClass('active');
                $('#slide'+activeSlideId).removeClass('na');
                $('#slide'+activeSlideId).addClass('active');
            }
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
        $(this).parent().parent().parent().parent().addClass('active');
    });
    $('section.six .references-galerie .close').click(function(){
        $(this).parent().parent().parent().parent().removeClass('active');
    });

});