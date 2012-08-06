/**
 * @author Christian Jung
 * @dependencies jQuery
 */

NotificationSystem = function( _config ) {

	self = this;

	var config = _config;

	this.init = function() {
		// create notification space
		if( $( '#notification_area' ).length === 0 ) {
			$( '<div/>', {
				id: 'notification_area',
				css: {
					'position': 'absolute',
					'top': '30px',
					'right': '10px',
					'width': '300px'
				}
			}).appendTo( $( 'body' ) );

		}
	}

	this.show_notification = function( _text ) {
		var notification = $( '<div/>', {
			'text': _text,
			'class': 'notification',
			'css': {
				'display': 'none'
			}
		});
		notification
			.appendTo( $( '#notification_area' ) )
			.fadeIn( 'slow' )
			.delay( 2000 )
			.fadeOut( 'slow', function(){
				$( this ).remove();
			})
	}

	this.show_error = function( _text ) {
		var notification = $( '<div/>', {
			'text': _text,
			'class': 'notification error',
			'css': {
				'display': 'none'
			}
		});
		notification
			.appendTo( $( '#notification_area' ) )
			.fadeIn( 'slow' )
			.delay( 2000 )
			.fadeOut( 'slow', function(){
				$( this ).remove();
			})
	}


}

var notify = new NotificationSystem;
	notify.init();
