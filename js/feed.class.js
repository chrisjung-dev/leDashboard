/**
 * @author cjung
 */
var feeds = {};

Feed = function( _id, _config ) {

	// prepare for scope problems in methods
	var self = this;

	self.id = _id;

	var title = _config['title'];
	var url = _config.url; 
	var feed_url = _config.feedUrl;
	var entries = _config.entries;

	var reload_time = $settings ? $settings.reloadtime : 5;

	var auto_reload = window.setInterval( function() {

		self.reload_feed();

	}, ( (1000*60) * reload_time ) );
	//}, ( (1000*60*5) ) );

	this.init = function( ) {
		render_widget();
	}

	/**
	 *	Get all the feeds and create "Widgets" for them
	 */
	var render_widget = function() {
		if( $( '#' + self.id ).length === 0 ) {
			$( '#feeds' ).append(
				$('<div/>', {
					'id': self.id,
					'class': 'feed',
					'html': '<h2><a href="' + url  + '" target="_blank">' + title + '</a></h2><div class="loading"></div>'
				})
			);
		} else {
			$( '#' + self.id ).html( '<h2><a href="' + url  + '">' + title + '</a></h2><div class="loading"></div>' );
		}
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
						click: function() {
							$item = $( this );

							if( ! $item.hasClass( 'opened' ) ) {

								$item
									.addClass( 'opened' )
									.append(
										$( '<p/>', {
											'html': $( this ).find( 'a' ).attr( 'title' ),
											'class': 'description'
										})
									);

							} else {

								$item
									.removeClass( 'opened' )
									.find( 'p' )
										.remove();

							}
						}
					});

					$a = $( '<a/>', {
						'html': json.data[ item ][ 'title' ] != "" ? json.data[ item ][ 'title' ] : '(no title)',
						'href': json.data[ item ][ 'permalink' ],
						'title': json.data[ item ][ 'description' ],
						'target': '_blank',
						'click': function( evt ) {
							// prevent the link from recieving the click
							// and open when permalink is clicked 
							evt.stopPropagation();
						}
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
		$( '#' + this.id + ' div' ).addClass( 'loading' ).empty();
		get_single_feed_content( self.id );
	}
}
