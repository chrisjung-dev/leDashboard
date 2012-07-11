$(function(){
	
	/**
	 * initially render all the widgets and get the contents
	 */
	render_feed_widgets();

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
				'class': 'reload',
				'click': reload_single_feed
			}).appendTo( buttons );
			
			var togglebutton = $( '<span/>', {
				'text': 'mini/maxi',
				'class': 'toggle'
			}).appendTo( buttons );
		
			$( this ).prepend( buttons );
		},
		function(){
			$( this ).find( '.buttons' ).remove();
		}
	)

	$( '#menu .reloadall' ).click( function() {
		$( '#feeds .feed > h2' ).each( reload_single_feed )
	});
});
