/**
 * @author cjung
 */
var feeds = {};

Feed = function( _id, _config ) {

	// prepare for scope problems in methods
	var _self = this;

	_self.id = _id;

	var title = _config.title,
		url = _config.url,
		feed_url = _config.feedUrl,
		entries = _config.entries,
		reload_time = $settings ? $settings.reloadtime : 5;

	var auto_reload = window.setInterval( function() {

		_self.reload_feed();

	}, ( (1000*60) * reload_time ) );

	this.init = function( ) {
		render_widget();
	};

	/**
	 *	Get all the feeds and create "Widgets" for them
	 */
	var render_widget = function() {

		if( $( '#' + _self.id ).length === 0 ) {
			$( '#feeds' ).append(
				_self.templates.main( {
					id: _self.id,
					url: url,
					title: title
				} )
			);
		} else {
			$( '#' + _self.id ).append( '<div class="loading"></div>' );
		}

		get_single_feed_content();
	};

	/**
	 *	get feed contents via JSON and render link list
	 * Parameters: _feed
	 */
	var get_single_feed_content = function() {
		
		$.ajax({
			url: 'get_feed.php',
			dataType: 'json',
			data: {
				'feed_id' : _self.id,
				'feed_url': feed_url
			},
			type: 'POST',
			success: function( json ){
				
				// get the feed id from meta items
				var $feed_id = json.meta.id;
				var $ul = $( '<ul/>' );
				$( '#' + $feed_id + '>div:last' ).append( $ul );
			
				for( var item in json.data ) {
					var $li = $( '<li/>', {
						'click': _self.clickFeedItem
					});

					var $a = $( '<a/>', {
						'html': json.data[ item ].title !== '' ? json.data[ item ].title : '(no title)',
						'href': json.data[ item ].permalink,
						'title': json.data[ item ].description,
						'target': '_blank',
						'click': _self.stopPropagation
					});
					$li.append( '<i/>' );
					$li.append( $a );
					$ul.append( $li );

					// remove the loading animation
					$ul.parents( '.feed>.loading' ).removeClass( 'loading' );

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
	};

	/**
	 *	reload a single feed
	 * - triggered by reload button in feeds
	 * - triggered for all feeds by reloadall button
	 */
	this.reload_feed = function(){
		/**
		 * remove old list and add loading icon
		 */
		$( '#' + this.id + '> div' ).addClass( 'loading' ).empty();
		get_single_feed_content( _self.id );
	};

	/**
	 *	handle clicks on the feed items
	 */
	this.clickFeedItem = function( _this ) {
		console.log( 'clicked item' );
		var $item = $( this );

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
	};

	this.stopPropagation = function( evt ){
		console.log( 'clicked link' );
		evt.stopPropagation();
	};

	this.templates = {
		
		/**
		 *	feed template
		 */

		'main': _.template( '<div id="<%= id %>" class="feed"><h2><a href="<%= url %>" target="_blank"><%= title %></a></h2></div>' ),

		/**
		 *	feed item template
		 */
		'item': _.template(
			'<ul><% _.each( items, function( item ){' +
				'console.log( item )'+
			'} ) %></ul>'
		)
	};


};
