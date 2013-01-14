<?php
include( 'inc/includes.php' );
	
$active_user = User::get_user_session();

if(	$active_user === false 
	&& !isset( $_POST[ 'user_name' ] ) 
	&& !isset( $_POST[ 'password' ] ) ){

	include( 'inc/form.login.php' );

} elseif ( $active_user === false 
			&& isset( $_POST[ 'user_name' ] ) 
			&& isset( $_POST[ 'password' ] ) ) {

	User::login( $_POST[ 'user_name' ], $_POST[ 'password' ], $_POST[ 'permanent' ] );

	$host  = $_SERVER['HTTP_HOST'];
	$uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
	$extra = '';
	header("Location: http://$host$uri/$extra");

} else { 
	include( 'inc/show_feeds.php' )	;
} ?>
