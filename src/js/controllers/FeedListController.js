/**
 * src/js/controllers/FeedListController.js
 * @author Christian Jung <campino2k@gmail.com>
 * @since 2013-10-17 21:52
 */

function FeedListController ( $scope, $http ){
	$scope.load = $http.get( 'read_feed_config.php' )
		.success(function( data ){
		$scope.feeds = data;

		/*
		for( feed in data ){
			console.log( data[ feed ] );
		}
		*/
	});
	$scope.reload = function(){
		console.log( "reload: " + this.feed.feedUrl );
	};
}