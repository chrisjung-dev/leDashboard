$(function(){
	
	/**
	 * initially render all the widgets and get the contents
	 */
	feed_handling = new feed_handling();

	feed_handling.render_feed_widgets();

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
				'click': feed_handling.reload_single_feed
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

	$( 'header .reloadall' ).click( function() {
		$( '#feeds .feed > h2' ).each( feed_handling.reload_single_feed )
	});
});
