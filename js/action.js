$(function(){
	for ( feed in feeds ) {

		console.log( feed );

		$( '#feeds' ).append( 
			$('<div/>', {
				'id': feed,
				'text': feeds[ feed ].title
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
	}
});
