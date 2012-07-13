$(function(){
	
	/**
	 *	Load config from json
	 */
	jQuery.getJSON( 'config/feeds.json', function( json ) {
		console.log( json );
	});



	/**
	 * 	Show / hide buttons when hovering the feed widgets
	 */
	$( '.feed', '#feeds' ).hover(
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
		},
		function(){
			$( this ).find( '.buttons' ).remove();
		}
	)

	/**
	 *	implement "reload all"
	 */
	$( 'header .reloadall' ).click( function() {
		for( feed in feeds ) {
			feed.reload();
		}
//		$( '#feeds .feed > h2' ).each( feed_handling.reload_single_feed )
	});
});
