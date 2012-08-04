/**
 *	@author Christian Jung <campino2k@gmail.com>
 */

open_settings_form = function() {
	$settings_form.dialog( 'open' );
};

$settings_form = $( '#settings-form' ).dialog({
	autoOpen: false,
	width: 350,
	modal: true,
	open: function() {
		// TODO Fill the fields with the settings values
	},
	buttons: {
		'Save settings' : function() {
			// TODO Save the settings
		},
		'Cancel' : function() {
			$( this ).dialog( 'close' );
		}
	}
})
