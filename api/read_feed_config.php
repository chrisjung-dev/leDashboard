<?php

include('../inc/user.class.php');

$user_name = User::get_user_session();

if( !$user_name ) {
	die('{msg:"No User Session"}');
}

$file = file_get_contents( '../config/' . $user_name . '/feeds.json' );

echo $file;
