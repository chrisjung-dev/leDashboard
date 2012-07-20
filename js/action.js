$(function(){

	/**
	 * Make Feeds sortable
	 */
	$('#feeds').sortable({
		handle: 'h2'
	});
	// TODO implement callback to save changes in JSON / config object
	
	
	/**
	 *	Load config from json
	 */
	jQuery.getJSON( 'config/feeds.json', function( json ) {
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
		// DEBUG
		//e.preventDefault();
		console.log( 'li item clicked' );
		// DEBUG END

		$( this ).addClass( 'opened' );


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
	$( 'header .reloadall' ).click( function() {
		for( feed in feeds ){
			feeds[ feed ].reload_feed();
		}
	});

	/**
	 *	Make buttons
	 */
	$( 'header .reloadall' ).button({
		icons: {
			primary: 'ui-icon-refresh'
		}
	})
});
