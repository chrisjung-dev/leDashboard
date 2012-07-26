/**
 *	All actions and handlers needed to add a new Feed
 */

var id = $( "#id" ),
	site_title = $( "#site_title" ),

	password = $( "#password" ),
	allFields = $( [] ).add( id ).add( site_title ).add( password ),
	tips = $( ".validateTips" );


open_add_feed_form = function() {
	$( "#new-feed-form" ).dialog( "open" )
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

$( "#new-feed-form" ).dialog({
	autoOpen: false,
//	height: 500,
	width: 350,
	modal: true,
	buttons: {
		"Add this Feed": function() {
			var bValid = true;
			allFields.removeClass( "ui-state-error" );

			bValid = bValid && checkRegexp( id, /^[a-zA-Z]([0-9a-zA-Z_-])+$/, "ID field only allows : a-z 0-9 _ -, must begin with a letter." );

	//		bValid = bValid && checkLength( site_title, "username", 3, 16 );
	//		bValid = bValid && checkLength( email, "email", 6, 80 );
	//		bValid = bValid && checkLength( password, "password", 5, 16 );

	//		bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );

			if ( bValid ) {

				/**
				 *	Here, add the new feed to feeds var, render and save!
				 */ 
				$( this ).dialog( "close" );
			}
		},
		Cancel: function() {
			$( this ).dialog( "close" );
		}
	},
	close: function() {
		// TODO
		// Create the new Feed.
		allFields.val( "" ).removeClass( "ui-state-error" );
	}
});
