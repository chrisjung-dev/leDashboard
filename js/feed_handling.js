/**
 * @author cjung
 */

/**
 *	Get all the feeds and create "Widgets" for them
 */
render_feed_widgets = function() {
	for ( feed in feeds ) {
		$( '#feeds' ).append(
			$('<div/>', {
				'id': feed,
				'class': 'feed',
				'html': '<h2><a href="' + feeds[ feed ].url  + '">' + feeds[ feed ].title + '</a></h2><div class="loading"></div>'
			})
		);
		get_single_feed_content( feed );
	}; // end widget creation
};

/**
 * get feed contents via JSON and render link list
 * Parameters: _feed
 */
get_single_feed_content = function( _feed ) {
	var feed = _feed;
	
	$.ajax({
		url: 'get_feed.php',
		dataType: 'json',
		data: {
			'feed_id' : feed,
			'feed_url': feeds[ feed ].feedUrl
		},
		type: 'POST',
		success: function( json ){
			
			// get the feed id from meta items 
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

				// remove the loading gif
				$ul.parent().removeClass( 'loading' );

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
}

/**
 * reload a single feed
 * - triggered by reload button in feeds
 * - triggered for all feeds by reloadall button
 */
reload_single_feed = function(){
	/**
	 * remove old list and add loading icon
	 */
	var $feed = $( this ).parents( '.feed' );
	$feed.find( 'div' ).addClass( 'loading' ).empty();
	get_single_feed_content( $feed.attr( 'id' ) );
} 