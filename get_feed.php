<?php
	/*
	 * import simplepie for feed handling
	 */
	require_once( 'inc/simplepie_1.3.mini.php' );

	/*
	 *	todo: sanatize the variables
	 */
	$feed_url = $_POST[ 'feed_url'];
	$feed_id  = $_POST[ 'feed_id' ];

	$feed = new SimplePie();
	$feed->set_feed_url( $feed_url );
	$feed->init();
	$feed->handle_content_type();

	$output[ 'meta' ][ 'id' ] = $feed_id;

foreach ($feed->get_items() as $item):
	 
	
	$output_item[ 'title' ]	      = $item->get_title() ;
	$output_item[ 'permalink' ]   = $item->get_permalink();
	$output_item[ 'description' ] = $item->get_description();
	$output_item[ 'date' ]        = $item->get_date();

	$output[ 'data'  ][] = $output_item; 

endforeach;

echo json_encode( $output );
