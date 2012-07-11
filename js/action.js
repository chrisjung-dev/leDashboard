$(function(){

	/**
	 *	Get all the feeds and create "Widgets" for them
	 */
	for ( feed in feeds ) {

		$( '#feeds' ).append( 
			$('<div/>', {
				'id': feed,
				'class': 'feed',
				'html': '<h2>' + feeds[ feed ].title + '</h2><div></div>'
			})
		);

		$.ajax({
			url: 'get_feed.php',
			dataType: 'json',
			data: {
				'feed_id' : feed,
				'feed_url': feeds[ feed ].feedUrl
			},
			type: 'POST',
			success: function( json ){
				
				$feed_id = json.meta.id;
				
				$ul = $( '<ul/>' );
				$( '#' + $feed_id + ' div' ).append( $ul );
			
				for( item in json.data ) {
					$li = $( '<li/>', {
						'title': json.data[ item ][ 'description' ]
					});

					$a = $( '<a/>', {
						'text': json.data[ item ][ 'title' ],
						'href': json.data[ item ][ 'permalink' ]
					});
					$li.append( $a );
					$ul.append( $li );

					// use enties -1 since "item" will be an index
					if( feeds[ $feed_id ].entries && 
						item >= feeds[ $feed_id  ].entries-1 ) 
					{
						//console.log( 'maximum reached' );
						break;
					}
				}
			}
		});
	}; // end widget creation

	$( '.feed', '#feeds' ).hover(
		function(){
			
			var buttons = $('<span/>', {
				'class': 'buttons'
			});

			var reloadbutton = $( '<span/>', {
				'text': 'reload',
				'class': 'reload'
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
});
