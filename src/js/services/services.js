/**
 * Created by cjung on 19.11.13.
 */
var leDashboardServices = angular.module( 'leDashboardServices', [], function ( $provide, $log ){
	$log.log( 'Services initialized');
	$provide.service( 'getFeedList', function (){
		return {
			'feed_id': 'test'
		}
	} );
	$provide.service( 'getFeedItems', function (){
		return {
			'title': 'testtitle'
		}
	} );
} );