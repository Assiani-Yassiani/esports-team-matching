

(function ($) {
 "use strict";

/*----------------------------
1. Full page Preloader
-----------------------------*/
    
    jQuery(window).on('load', function() {
      jQuery("#status").fadeOut();
      jQuery("#preloader").delay(350).fadeOut("slow");
    });
    
    
/*----------------------------
 2. Mobile Menu Activation
-----------------------------*/
    jQuery('.mobile-menu nav').meanmenu({
        meanScreenWidth: "1023",
    });


/*--------------------------
 3. Sticky Menu 
---------------------------- */
	$(window).on('scroll', function(){
		if( $(window).scrollTop()>450 ){
			$('#sticky').addClass('sticky');
			} else {
			$('#sticky').removeClass('sticky');
		}
	});


/*----------------------------
4. wow js active
------------------------------ */
	new WOW().init();
 
/*----------------------------
5. owl active
------------------------------ */ 

	$(".blog-slider").owlCarousel({
		autoPlay: true, 
		slideSpeed:2000,
		pagination:false,
		navigation:false,	  
		items : 3,
		/* transitionStyle : "fade", */    /* [This code for animation ] */
		navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [992,2],
		itemsTablet: [768,2],
		itemsMobile : [480,1],
	});

/*--------------------------
6. jarallax active
---------------------------- */
	$('.jarallax').jarallax({
		speed: 0.5
	});

/*----------------------------
7. isotope active
------------------------------ */     
	var $grid = $('.grid').isotope({
	    itemSelector: '.grid-item',
	    stagger: 30
	});

	$('.filter-demo').on( 'click', '.button', function() {
	    var filterValue = $(this).attr('data-filter');
	    $grid.isotope({ filter: filterValue });
	});

	// change is-checked class on buttons

	$('.filter').each( function( i, buttonGroup ) {
	    var $buttonGroup = $( buttonGroup );
	    $buttonGroup.on( 'click', '.button', function() {
	      $buttonGroup.find('.is-checked').removeClass('is-checked');
	      $( this ).addClass('is-checked');
	    });
	});

/*----------------------------
8. magnific Popup active
------------------------------ */
	$('.gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
	});

/*--------------------------
9. Counter Animation
---------------------------- */
	var counterAnim = $('.counter-anim');
	if( counterAnim.length > 0 ){
		counterAnim.counterUp({ delay: 20,
        time: 1000});
	}
/*--------------------------
10. bxslider active
---------------------------- */   
	$('.bx-demo').bxSlider({
		pagerCustom: '.bx-thumb'
	});

/*--------------------------
11. nice Select active
---------------------------- */
	$('select').niceSelect();

/*--------------------------
12. slick slider active
---------------------------- */

	//Testimonial slider
	 $('.contentst').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: false,
	  fade: true,
	  asNavFor: '.thumb_content'
	});
	$('.thumb_content').slick({
	  slidesToShow: 5,
	  slidesToScroll: 1,
	  asNavFor: '.contentst',
	  dots: false,
	  centerMode: true,
	  focusOnSelect: true
	});

	//Company slider
	$('.companies').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 3000,
	});


	//jobs slider
	$('.jobs').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: true,
	  autoplaySpeed: 4000,
	});

/*--------------------------
13. Login SingUp Form jquery
---------------------------- */	

	$(".prev-step").on('click',function(){
		$( ".next-step" ).removeClass( "active" );
		$( ".prev-step" ).addClass( "active" );

		$( "#login" ).removeClass("lighting");
		$( "#register").addClass( "lighting" );
		
	});

	$(".next-step").on('click',function(){
		$( ".prev-step" ).removeClass( "active" );
		$( ".next-step" ).addClass( "active" );

		$( "#login" ).addClass("lighting");
		$( "#register").removeClass( "lighting" );
	});


	$(".p-step").on('click',function(){
		$( ".next-step" ).addClass( "active" );
		$( ".prev-step" ).removeClass( "active" );

		$( "#login" ).addClass("lighting");
		$( "#register").removeClass( "lighting" );
		
	});

	$(".n-step").on('click',function(){
		$( ".prev-step" ).addClass( "active" );
		$( ".next-step" ).removeClass( "active" );

		$( "#login" ).removeClass("lighting");
		$( "#register").addClass( "lighting" );
	});


	$(".log_in").on('click',function(){
		$( ".prev-step" ).addClass( "active" );
		$( ".next-step" ).removeClass( "active" );

		$( "#login" ).removeClass("lighting");
		$( "#register").addClass( "lighting" );
	});


	$(".sign_up").on('click',function(){
		$( ".next-step" ).addClass( "active" );
		$( ".prev-step" ).removeClass( "active" );

		$( "#login" ).addClass("lighting");
		$( "#register").removeClass( "lighting" );
		
	});
/*--------------------------
14. scrollUp
---------------------------- */	
	$.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    }); 	   
 
})(jQuery); 