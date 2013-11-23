/**
 * src/js/controllers/FeedListController.js
 * @author Christian Jung <campino2k@gmail.com>
 * @since 2013-10-17 21:52
 */

function FeedListController( $scope, $http, $log ){
	$scope.load = function (){
		$http
			.get( 'read_feed_config.php' )
			.success( function ( data ){
				$scope.feeds = data;
			} );
	};

	$scope.moveleft = function (){
		$log.log( 'move left' )
	};

	$scope.moveright = function (){
		$log.log( 'move right' )
	};
	// init loading
	$scope.load();
}