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

			save_feed_config( $save_feeds );

		}
	});
	
	/**
	 * Load general settings
	 */
	$get_settings = $.ajax({
		url: 'config/settings.json',
		dataType: 'json',
		async: false,
		success: function( json ) {
			// set global variable for general settings
			$settings = json;
		}
	});

	/**
	 *	Load feed config from json
	 */
	$get_feeds = $.getJSON( 'config/feeds.json', function( json ) {
		
		$loaded_feeds = json;

		for( feed_id in json ) {
			var newFeed = new Feed( feed_id, json[ feed_id ] );
			newFeed.init();
			feeds[ feed_id ] = newFeed;
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

			var reloadbutton = $( '<a/>', {
				'text': 'reload',
				'click': function(){
					feeds[ $(this).parents( '.feed' ).attr( 'id' ) ].reload_feed()
				}
			}).button({
				icons: {
					primary: 'ui-icon-arrowrefresh-1-e'
				},
				text: false
			}).appendTo( buttons );
			
			var togglebutton = $( '<a/>', {
				'text': 'mini/maxi',
			}).button({
				icons: {
					primary: 'ui-icon-minus'
				},
				text: false
			}).appendTo( buttons );

			var editButton = $( '<a/>', {
				'text': 'edit',
				'click': function() {
					$this_id =$(this).parents( '.feed' ).attr( 'id' ); 
					$this_item = $loaded_feeds[ $this_id ];

					$id.val( $this_id );
					$site_url.val( $this_item.url  );
					$feed_url.val( $this_item.feedUrl );
					$site_title.val( $this_item.title );
					$entries.val( $this_item.entries );
					
					$( '#new-feed-form' ).dialog( 'option', 'title', 'Edit Feed Settings' );
					open_add_feed_form();
				}
			}).button({
				icons: {
					primary: 'ui-icon-wrench'
				},
				text: false,
			}).appendTo( buttons );

			// make the buttons stick together
			buttons.buttonset();
		
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
		.click( function(){
			$( '#new-feed-form' ).dialog( 'option', 'title', 'Add new feed' );
			open_add_feed_form();
		});

	$( 'header .settings' )
		.button({
			icons: {
				primary: 'ui-icon-wrench'
			}
		})
		.click( function(){
			open_settings_form();
		})
});

/**
 *	Save the configured Feeds
 */
var save_feed_config = function( _feeds ) {

	$.ajax({
		url: 'save_feed_config.php',
		type: 'POST',
		data: {
			'feeds_config': JSON.stringify( _feeds )
		},
		success: function() {
			/**
			 * only after file was saved successfully, we will assume the saved
			 * config is the "new loaded" one to enable multiple sorts without reloading
			 * feed config and redraw all feeds
			 */
			$loaded_feeds = _feeds;

			notify.show_notification( 'Feed config and order has been saved' );
		},
		error: function(_req, _text, _error ) {
			// warning message if nothing could be saved
			notify.show_error( 'Feed config could not be saved: \n' + _error  );
		}
	})
}
