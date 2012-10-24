<?php

session_name( 'leDashboard' );
session_start();

class User {

	public static function login( $_user_name, $_password ) {
		// get JSON File, Encode, 
		$usersfile = file_get_contents( 'config/users.json' );
		$users = json_decode( $usersfile, true );
	
	   switch (json_last_error()) {
			case JSON_ERROR_DEPTH:
				die( ' - Maximum stack depth exceeded' );
			break;
			case JSON_ERROR_STATE_MISMATCH:
				die( ' - Underflow or the modes mismatch' );
			break;
			case JSON_ERROR_CTRL_CHAR:
				die( ' - Unexpected control character found' );
			break;
			case JSON_ERROR_SYNTAX:
				die( ' - Syntax error, malformed JSON' ) ;
			break;
#			case JSON_ERROR_UTF8:
#				die( ' - Malformed UTF-8 characters, possibly incorrectly encoded' );
#			break;
			default:
				// do nothing, everything is fine
			break;
		}

		if( isset( $users[ $_user_name ] ) && $users[ $_user_name ][ 'password'] === sha1( $_password ) ) : 

			$_SESSION[ 'user_name' ] = $_user_name;
			$_SESSION[ 'full_name' ] = $users[ $_user_name ][ 'fullname' ];

			// TODO: Password check!
			// TODO: Error handling!
		
			var_dump( $_SESSION );

		else : 

			die( 'whoopsie' . sha1( $_password ) );
			User::logout();

		endif;
	}

	/**
	 *	Returns the valid Session or false if there is no Session found 
	 *
	 * @author Chris Jung <campino2k@gmail.com>
	 * @since 2012.09.11
	 */
	public static function get_user_session() {
		
		$SID = session_id();

		if ( !empty( $SID ) ) :

			if ( isset( $_SESSION[ 'user_name' ] ) ) :

				$user_name = $_SESSION[ 'user_name' ];

				return $user_name;

			else :

				return false;

			endif;

		else :
			
			return false;

		endif;
		
	}
	
	public static function logout() {
		session_destroy();
	}
}
