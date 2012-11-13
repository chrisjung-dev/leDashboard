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

			$settings.columns = $settings_cols.val();
			$settings.background = $settings_background.val();
			$settings.reloadtime = $settings_reloadtime.val();

			save_settings( $settings );

			applySettings();
			$( this ).dialog( 'close' );
		},
		'Cancel' : function() {
			$( this ).dialog( 'close' );
		}
	}
})

applySettings = function() {
	/**
	 *	Apply Feed Settings
	 */
	$( '#feeds' )
		.removeClass( 'col2 col3 col4 col5'  )
		.addClass( 'col' + $settings.columns );
}
