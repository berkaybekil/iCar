/*
* 
* Interdi Digital Agency
* 2012
*
*/

MAIN = {
	
	init : function () {
		
		$('.like').click(function () {
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				var countLike = parseInt($(this).children('.count').text())-1;
				$(this).children('.count').text(countLike);
			}
			else {
				$(this).addClass('selected');
				var countLike = parseInt($(this).children('.count').text())+1;
				$(this).children('.count').text(countLike);
			}
		});
		
		$('#button').click(function () {
			$('#page-container').stop().animate({"marginTop": "-460px"}, "100");		
			$('#menu').removeClass('animated bounceOutUp bounceInDown').hide(); 						
		});
        
        window.addEventListener('shake', shakeEventDidOccur, false);
        
        //define a custom method to fire when shake occurs.
        function shakeEventDidOccur () {
            
            //put your own code here etc.
            navigator.notification.vibrate(1000);
            $('#page-container').stop().animate({"marginTop": "-460px"}, "100");
        }

		
		$('#close-btn').click(function () {
			$('#page-container').stop().animate({"marginTop": "0px"}, "100");
			$('#menu').removeClass('animated bounceOutUp bounceInDown').hide();
            onDeviceReady()
		});
		
		$('#menu-btn').click(function () {
			
			if ($('#menu').hasClass('bounceInDown')) {
				$('#menu').removeClass('bounceInDown').addClass('animated bounceOutUp').show();
			}
			else {
				$('#menu').removeClass('bounceOutUp').addClass('animated bounceInDown').show();
			}
		});
		
		$('#info-icon').click(function () {
			$('#info-area').fadeToggle();		
		});
		
		$('#skip').click(function () {
			$('#connect, #skip').fadeOut();		
		});
				
				
	},
	
	bigHeart : function () {
	
		var doubleTapCount=0;
	
		$(".detail-image").swipe( {
			tap:function(event, target) {
				tapCount++;
				msg(target);
			},
			doubleTap:function(event, target) {
				doubleTapCount++;
				msg(target);
				
				if (!$(this).next('.detail-info').children('.like').hasClass('selected')) {
					$(this).children('.big-heart').stop().fadeIn().delay(100).fadeOut();
					$(this).next('.detail-info').children('.like').addClass('selected');
					var count = parseInt($(this).next('.detail-info').children('.like').children('.count').text())+1;
					$(this).next('.detail-info').children('.like').children('.count').text(count);
				}				
			},
			threshold:50
		});
		
		function msg(target) {
			console.log(doubleTapCount);
		}
	
	},
	
	heart : function () {
	
		var doubleTapCount=0;
	
		$(".random-box").swipe( {
			tap:function(event, target) {
				tapCount++;
				msg(target);
			},
			doubleTap:function(event, target) {
				doubleTapCount++;
				msg(target);
				
				if (!$(this).find('.heart-top').hasClass('selected')) {
					$(this).find('.heart-top').addClass('selected');
					var count = parseInt($(this).find('.count').text())+1;
					$(this).find('.count').text(count);
				}				
			},
			threshold:50
		});
		
		$('.heart-top').click(function () {
			if (!$(this).hasClass('selected')) {
				$(this).addClass('selected');
				var count = parseInt($(this).children('.count').text())+1;
				$(this).children('.count').text(count);
			}				
			
		});
		
		function msg(target) {
			console.log(doubleTapCount);
		}
	
	}
	
	
	
}


$(function () {
	
	MAIN.init();
	MAIN.bigHeart();
	MAIN.heart();	
	
});