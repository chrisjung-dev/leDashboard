$(function(){
	
	/**
	 *	Load config from json
	 */
	jQuery.getJSON( 'config/feeds.json', function( json ) {
		for( feed_id in json ) {
			newFeed = new Feed( feed_id, json[ feed_id ] );
			newFeed.init();
			feeds.push( newFeed );
		}
	});



	/**
	 * 	Show / hide buttons when hovering the feed widgets
	 */
	//$( '.feed', '#feeds' ).hover(
	$( '#feeds' ).on( 'mouseenter', '.feed',  
		function(){
			var buttons = $('<span/>', {
				'class': 'buttons'
			});

			var reloadbutton = $( '<span/>', {
				'text': 'reload',
				'class': 'button reload',
//				'click': feed_handling.reload_single_feed
			}).appendTo( buttons );
			
			var togglebutton = $( '<span/>', {
				'text': 'mini/maxi',
				'class': 'button toggle'
			}).appendTo( buttons );
		
			$( this ).prepend( buttons );
		}
	)
	$( '#feeds' ).on( 'mouseleave', '.feed',
		function(){
			$( this ).find( '.buttons' ).remove();
		}
	)

	/**
	 *	implement "reload all"
	 */
	$( 'header .reloadall' ).click( function() {
	});
});
