(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {

		if( classie.has( overlay, 'open' ) ){
            $('#youtube_overlay').empty();
            $('#header_text').show();
            $('#video_'+ bubblLanding.current_bubbl_landing_page).get(0).play();
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}

		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
            $('#header_text').hide()
            $('#video_'+ bubblLanding.current_bubbl_landing_page).get(0).pause();
            var youtube_url = $('#video_'+ bubblLanding.current_bubbl_landing_page).data("videourl")+'?autoplay=1';
            $('#youtube_overlay').append('<iframe src="'+youtube_url+'" frameborder="0" allowfullscreen></iframe>')
            var fullContentOpen = {
                // Define ranges to bucket data points into meaningful segments
                device: 'desktop'
            };
            // Send the dimensions to Parse along with the 'search' event
            Parse.Analytics.track('fullContentOpen', fullContentOpen)
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
})();