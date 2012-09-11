<?php

include( 'inc/user.class.php' );

$username = User::get_user_session();
$file = file_get_contents( 'config/' . $username . '/feeds.json' );

echo $file;
