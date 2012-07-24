$(function(){

	/**
	 * Make Feeds sortable
	 */
	$('#feeds').sortable({
		handle: 'h2',
		forcePlaceholderSize: true,
		placeholder: 'feed placeholder',
		stop: function( event, ui ) {
			var $save_feeds = {};

			$( '#feeds .feed' ).each(function(index) {
				$save_feeds[ $( this ).attr( 'id' ) ] = $loaded_feeds[ $( this ).attr( 'id' ) ];
			});

			$.ajax({
				url: 'save_feed_config.php',
				type: 'POST',
				data: {
					'feeds_config': JSON.stringify( $save_feeds )
				},
				success: function() {
					/**
					 * only after file was saved successfully, we will assume the saved
					 * config is the "new loaded" one to enable multiple sorts without reloading
					 * feed config and redraw all feeds
					 */
					$loaded_feeds = $save_feeds;
				},
				error: function(_req, _text, _error ) {
					// warning message if nothing could be saved

					console.log( _text + ": " + _error );

					alert( 'Feed config could not be saved' );
				}
			})

		}
	});
	
	/**
	 *	Load config from json
	 */
	$.getJSON( 'config/feeds.json', function( json ) {
		
		$loaded_feeds = json;

		for( feed_id in json ) {
			newFeed = new Feed( feed_id, json[ feed_id ] );
			newFeed.init();
			//feeds.push( newFeed );
			feeds[ feed_id ] = newFeed;
		}
	});

	/**
	 * TODO
	 *	open list item to show more of the text
	 */
	$( '#feeds' ).on( 'click', '.feed li', function( e ) {
		$item = $( this );

		if( ! $item.hasClass( 'opened' ) ) {

			$item
				.addClass( 'opened' )
				.append(
					$( '<p/>', {
						'text': $( this ).attr( 'title' ),
						'class': 'description'
					})
				);

		} else {

			$item
				.removeClass( 'opened' )
				.find( 'p' )
					.remove();

		}

	});


	/**
	 * 	Show / hide buttons when hovering the feed widgets
	 */
	//$( '.feed', '#feeds' ).hover(
	$( '#feeds' ).on( 'mouseenter', '.feed',  
		function(){
			var buttons = $('<span/>', {
				'class': 'buttons'
			});

			var reloadbutton = $( '<span/>', {
				'text': 'reload',
				'class': 'button reload',
				'click': function(){
					feeds[ $(this).parents( '.feed' ).attr( 'id' ) ].reload_feed()
				}
			}).appendTo( buttons );
			
			var togglebutton = $( '<span/>', {
				'text': 'mini/maxi',
				'class': 'button toggle'
			}).appendTo( buttons );
		
			$( this ).prepend( buttons );
		}
	)
	$( '#feeds' ).on( 'mouseleave', '.feed',
		function(){
			$( this ).find( '.buttons' ).remove();
		}
	)

	/**
	 *	implement "reload all"
	 */
	$( 'header .reload_all' ).click( function() {
		for( feed in feeds ){
			feeds[ feed ].reload_feed();
		}
	});

	/**
	 *	Make buttons
	 */
	$( 'header .reload_all' ).button({
		icons: {
			primary: 'ui-icon-refresh'
		}
	});

	$( 'header .add_feed' )
		.button({
			icons: {
				primary: 'ui-icon-plusthick'
			}
		})
		.click( open_add_feed_form );
});
