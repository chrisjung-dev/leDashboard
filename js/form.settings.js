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
		
		// prefill the form fields
		$settings_cols.val( $settings.columns );
		$settings_background.val( $settings.background );
		$settings_reloadtime.val( $settings.reloadtime );

	},
	buttons: {
		'Save settings' : function() {
			// TODO Validate Settings
			// TODO Renew Timeout settings for feeds
			save_settings( $settings );
		},
		'Cancel' : function() {
			$( this ).dialog( 'close' );
		}
	}
})
