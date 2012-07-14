/**
 * @author cjung
 */
var feeds = [];

Feed = function( _id, _config ) {

	// prepare for scope problems in methods
	var self = this;

	self.id = _id;

	var title = _config['title'];
	var url = _config.url; 
	var feed_url = _config.feedUrl;
	var entries = _config.entries;

	this.init = function( ) {
		console.log( "Feed " + this.id + " has been initialized" );

		render_widget();
	}

	/**
	 *	Get all the feeds and create "Widgets" for them
	 */
	var render_widget = function() {
		$( '#feeds' ).append(
			$('<div/>', {
				'id': self.id,
				'class': 'feed',
				'html': '<h2><a href="' + url  + '">' + title + '</a></h2><div class="loading"></div>'
			})
		);
		get_single_feed_content();
	} 

	/**
	 * get feed contents via JSON and render link list
	 * Parameters: _feed
	 */
	var get_single_feed_content = function() {
		
		$.ajax({
			url: 'get_feed.php',
			dataType: 'json',
			data: {
				'feed_id' : self.id,
				'feed_url': feed_url
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
					if( entries && 
						item >= entries - 1 ) 
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
	this.reload_feed = function(){
		/**
		 * remove old list and add loading icon
		 */
		var $feed = $( this ).parents( '.feed' );
		$feed.find( 'div' ).addClass( 'loading' ).empty();
		get_single_feed_content( self.id );
	}
}
