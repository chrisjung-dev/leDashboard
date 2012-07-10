<?php
	/*
	 * import simplepie
	 */
	require_once( 'simplepie_1.3.mini.php' );

	$feed_url = $_POST[ 'feed_url'];

	$feed = new SimplePie();
	$feed->set_feed_url( $feed_url );
	$feed->init();
	$feed->handle_content_type();

foreach ($feed->get_items() as $item):
	 
	$output = '<div class="item">';
	$output .= '<h2><a href="' . $item->get_permalink() . '>' .  $item->get_title() . '</a></h2>';
	$output .= '<p>' . $item->get_description() . '</p>';
	$output .= '<p><small>Posted on ' . $item->get_date('j F Y | g:i a') . '</small></p>';
	$output .= '</div>';
														 
endforeach;

echo $output;
