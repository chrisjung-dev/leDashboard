<?php

/**
 *	recieve json string with feed config
 */
$feeds = $_POST[ 'feeds_config' ];

/**
 *	Test JSON for errors
 */
json_decode( $feeds );

if( json_last_error() != JSON_ERROR_NONE ) {
	die( '{"error":"Error occuured in JSON"}' );
}

// file writing explanation from http://www.evocomp.de/beispiele/php/file-datei.html

// Datei schreiben mit PHP
// Name der Datei, die beschrieben werden soll, festlegen.
$file_name = 'config/feeds.json';

// Datei zum Schreiben öffen. Existiert die Datei bereits,
// so wird diese überschrieben, da der File Pointer automatisch
// auf das erste Zeichen in der Datei gesetzt wird.
$file_handle = fopen ($file_name, 'w');

if( $file_handle === false ) {
	// content type?
	die( '{"error":"Error in saving the file"}' );
}

// Eine Zeichenkette in die geöffnete Datei schreiben.
fwrite ($file_handle, $feeds );

// Am Ende sollte die Datei geschlossen werden
fclose ($file_handle)

?>
