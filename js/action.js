$(function(){

	/**
	 *	Get all the feeds and create "Widgets" for them
	 */
	for ( feed in feeds ) {

		console.log( feed );

		$( '#feeds' ).append( 
			$('<div/>', {
				'id': feed,
				'class': 'feed',
				'html': '<h2>' + feeds[ feed ].title + '</h2><div></div>'
			})
		);

		$.ajax({
			url: 'get_feed.php',
			data: {
				'feed_url': feeds[ feed ].feedUrl
			}, 
			type: 'POST',
			success: function( data ){
				$('#debug').text( data );
			}
		});
	}; // end widget creation

	$( '.feed', '#feeds' ).hover(
		function(){
			var buttons = '<span class="buttons"><span class="reload">reload</span> <span class="toggle">mini/maxi</span></span>';
			$( this ).prepend( buttons );
		},
		function(){
			$( this ).find( '.buttons' ).remove();
		}
	)
});
