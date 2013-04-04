jQuery(function(){
	
	/**
	 * Load content parts
	 */
	jQuery.get( 'show/feed_add.html', function(data){ jQuery( 'body' ).append( data )} );
	jQuery.get( 'show/settings.html', function(data){ jQuery( 'body' ).append( data )} );

	/**
	 * Make Feeds sortable
	 */
	jQuery('#feeds').sortable({
		handle: 'h2',
		forcePlaceholderSize: true,
		placeholder: 'feed placeholder',
		stop: function( event, ui ) {

			save_feed_config( get_active_feeds() );

		}
	});
	
	/**
	 * Load general settings
	 */
	var $get_settings = jQuery.ajax({
		url: 'read_settings.php',
		dataType: 'json',
		async: false,
		success: function( json ) {
			// set global variable for general settings
			$settings = json;
			applySettings();
		}
	});

	/**
	 *	Load feed config from json
	 */
	var $get_feeds = jQuery.getJSON( 'read_feed_config.php', function( json ) {
		
		$loaded_feeds = json;

		for( var feed_id in json ) {
			var newFeed = new Feed( feed_id, json[ feed_id ] );
			newFeed.init();
			feeds[ feed_id ] = newFeed;
		}
	});


	/**
	 *	Show / hide buttons when hovering the feed widgets
	 */
	//jQuery( '.feed', '#feeds' ).hover(
	jQuery( '#feeds' ).on( 'mouseenter', '.feed',
		function(){
			var buttons = jQuery('<span/>', {
				'class': 'buttons'
			});

			var reloadbutton = jQuery( '<a/>', {
				'text': 'reload',
				'click': function(){
					feeds[ jQuery(this).parents( '.feed' ).attr( 'id' ) ].reload_feed();
				}
			}).button({
				icons: {
					primary: 'ui-icon-arrowrefresh-1-e'
				},
				text: false
			}).appendTo( buttons );
			
			var togglebutton = jQuery( '<a/>', {
				'text': 'mini/maxi'
			}).button({
				icons: {
					primary: 'ui-icon-minus'
				},
				text: false
			}).appendTo( buttons );
			
			var deleteFeedButton = jQuery('<a/>', {
				'text': 'delete',
				'click': function() {
					var $this_id = jQuery(this).parents( '.feed' ).attr( 'id' );

					jQuery( '#dialog-confirm' ).dialog({
						resizable: false,
						height:160,
						modal: true,
						buttons: {
							'Delete items': function() {

								jQuery( '#' + $this_id ).remove();
								save_feed_config( get_active_feeds() );
								jQuery( this ).dialog( 'close' );
							},
							Cancel: function() {
								jQuery( this ).dialog( 'close' );
							}
						}
					});
				}
			}).button({
				'icons': {
					'primary': 'ui-icon-close'
				},
				'text': false
			}).appendTo( buttons );

			var editButton = jQuery( '<a/>', {
				'text': 'edit',
				'click': function() {
					var $this_id =jQuery(this).parents( '.feed' ).attr( 'id' );
					var $this_item = $loaded_feeds[ $this_id ];

					$id.val( $this_id );
					$site_url.val( $this_item.url  );
					$feed_url.val( $this_item.feedUrl );
					$site_title.val( $this_item.title );
					$entries.val( $this_item.entries );
					
					jQuery( '#new-feed-form' ).dialog( 'option', 'title', 'Edit Feed Settings' );
					open_add_feed_form();
				}
			}).button({
				icons: {
					primary: 'ui-icon-wrench'
				},
				text: false
			}).appendTo( buttons );

			// make the buttons stick together
			buttons.buttonset();
		
			jQuery( this ).prepend( buttons );
		}
	);

	jQuery( '#feeds' ).on( 'mouseleave', '.feed',
		function(){
			jQuery( this ).find( '.buttons' ).remove();
		}
	);

	/**
	 *	implement "reload all"
	 */
	jQuery( 'header .reload_all' ).click( function() {
		for( var feed in feeds ){
			feeds[ feed ].reload_feed();
		}
	});

	/**
	 *	Make buttons
	 */
	jQuery( 'header .reload_all' ).button({
		icons: {
			primary: 'ui-icon-refresh'
		}
	});

	jQuery( 'header .add_feed' )
		.button({
			icons: {
				primary: 'ui-icon-plusthick'
			}
		})
		.click( function(){
			jQuery( '#new-feed-form' ).dialog( 'option', 'title', 'Add new feed' );
			open_add_feed_form();
		});

	jQuery( 'header .settings' )
		.button({
			icons: {
				primary: 'ui-icon-wrench'
			}
		})
		.click( function(){
			open_settings_form();
		});

	jQuery( 'header .logout' )
		.button({
			icons: {
				primary: 'ui-icon-power'
			}
		})
		.click(function(){
			jQuery.ajax( 'logout.php' );
			var location_array = location.href.split( '/' );
			var del = location_array.pop();
			location_array.push( 'logout.php' );
			var location_string = location_array.join( '/' );

			location.href = location_string;
		});
});
 
/**
 *	Get all shown feeds from DOM and return reordered feed object to save
 */
var get_active_feeds = function(){
	var $save_feeds = {};

	jQuery( '#feeds .feed' ).each(function(index) {
		$save_feeds[ jQuery( this ).attr( 'id' ) ] = $loaded_feeds[ jQuery( this ).attr( 'id' ) ];
	});

	return $save_feeds;
};

/**
 *	Save the configured feeds
 */
var save_feed_config = function( _feeds ) {

	jQuery.ajax({
		url: 'save_feed_config.php',
		type: 'POST',
		dataType: 'json',
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

			return true;
		},
		error: function(_req, _text, _error ) {
			/*
			console.log({
				'req': _req,
				'text': _text,
				'error': _error
			});
			*/
			// warning message if nothing could be saved
			notify.show_error( 'Feed config could not be saved: \n' + _error  );
			return false;
		}
	});
};

var save_settings = function( _settings ) {
	jQuery.ajax({
		url: 'save_settings.php',
		type: 'POST',
		data: {
			'settings': JSON.stringify( _settings )
		},
		success: function() {

			$settings = _settings;
			notify.show_notification( 'Settings have been saved successfully' );

			return true;
		},
		error: function( _req, _text, _error ){
			notify.show_error( 'Settings config could not be saved: \n' + _error  );
			return false;
		}
	});
};
