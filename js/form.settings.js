/**
 *	@author Christian Jung <campino2k@gmail.com>
 */
var $settings_cols = $( '#columns' ),
	$settings_background = $( '#background_url' ),
	$settings_reloadtime = $( '#reload_time' );

open_settings_form = function() {
	$settings_form.dialog( 'open' );
};

$settings_form = $( '#settings-form' ).dialog({
	autoOpen: false,
	width: 350,
	modal: true,
	open: function() {

		$settings_cols.val( $settings.columns );
		$settings_background.val( $settings.background );
		$settings_reloadtime.val( $settings.reloadtime );

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
