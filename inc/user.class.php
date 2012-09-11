<?php

class User {

	function login( _username, _password ) {
		// get JSON File, Encode, 
		$users = '';
		
		session_start();
		$_SESSION[ 'username ' ] = 'cjung';

	}

	/**
	 *	Returns the valid Session or false if there is no Session found 
	 *
	 * @author Chris Jung <campino2k@gmail.com>
	 * @since 2012.09.11
	 */
	function get_user_session() {

		if( isset( $_SESSION[ 'username' ] ) :
			
			$user_name = $_SESSION[ 'username ' ];
			return $user_name;
		
		: else :
			
			return false;

		: endif
	}
	
	function logout() {
	}
}
