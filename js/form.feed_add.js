/**
 *	All actions and handlers needed to add a new Feed
 *	@author Christian Jung <campino2k@gmail.com>
 */

var $id = $( '#id' ),
	$site_title = $( '#site_title' ),
	$feed_url = $( '#feed_url' ),
	$site_url = $( '#site_url' ),
	$entries = $( '#entries' ),

	password = $( "#password" ),
	allFields =	$( [] )
				.add( $id )
				.add( $site_title )
				.add( $feed_url )
				.add( $site_url )
				.add( $entries ),
	tips = $( ".validateTips" );


open_add_feed_form = function() {
	new_feed_form.dialog( "open" )
}

function updateTips( t ) {
	tips
		.text( t )
		.addClass( "ui-state-highlight" );
	setTimeout(function() {
		tips.removeClass( "ui-state-highlight", 1500 );
	}, 500 );
}

function checkLength( o, n, min, max ) {
	if ( o.val().length > max || o.val().length < min ) {
		o.addClass( "ui-state-error" );
		updateTips( "Length of " + n + " must be between " +
		min + " and " + max + "." );
		return false;
	} else {
		return true;
	}
}

function checkRegexp( o, regexp, n ) {
	if ( !( regexp.test( o.val() ) ) ) {
		o.addClass( "ui-state-error" );
		updateTips( n );
		return false;
	} else {
			return true;
	}
}

var new_feed_form = $( "#new-feed-form" ).dialog({
	autoOpen: false,
//	height: 500,
	width: 350,
	modal: true,
	buttons: {
		"Save this Feed": function() {
			var bValid = true;
			allFields.removeClass( "ui-state-error" );
			
			// check id field for illegal characters (html id attribute rules)
			bValid = bValid && checkRegexp( $id, /^[a-zA-Z]([0-9a-zA-Z_-])+$/, "ID field only allows : a-z 0-9 _ -, must begin with a letter." );
			
			// Check feed URL for http(s)
			bValid = bValid && checkRegexp( $feed_url, /^(http|https):\/\//, "URL must begin with http:// or https://" );

			// Check site URL for http(s)
			bValid = bValid && checkRegexp( $site_url, /^(http|https):\/\//, "URL must begin with http:// or https://" );

	//		bValid = bValid && checkLength( site_title, "username", 3, 16 );
	//		bValid = bValid && checkLength( email, "email", 6, 80 );
	//		bValid = bValid && checkLength( password, "password", 5, 16 );

	//		bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );

			if ( bValid ) {

				/**
				 *	Here, add the new feed to feeds var, render and save!
				 */

				var feed_config = {
					title: $site_title.val(),
					feedUrl: $feed_url.val(),
					url: $site_url.val(),
					entries: $entries.val() 
				};
				var newFeed = new Feed( $id.val(), feed_config );

				// render feed
				newFeed.init();

				// add to global feeds container
				feeds[ $id.val() ] = newFeed;

				$loaded_feeds[ $id.val() ] = feed_config;

				save_feed_config( $loaded_feeds );

				$( this ).dialog( "close" );
			}
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	close: function() {
		allFields.val( "" ).removeClass( "ui-state-error" );
	}
});
