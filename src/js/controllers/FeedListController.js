/**
 * src/js/controllers/FeedListController.js
 * @author Christian Jung <campino2k@gmail.com>
 * @since 2013-10-17 21:52
 */
Array.prototype.move = function ( from, to ){
	this.splice( to, 0, this.splice( from, 1 )[0] );
};
function FeedListController( $scope, $http, $log ){

	$scope.load = function (){
		$http
			.get( 'read_feed_config.php' )
			.success( function ( data ){
				$scope.feeds = data;
			} );
	};

	$scope.moveleft = function (){
		$log.log( 'move left' );

		var indexFrom = _.indexOf( this.feeds, this.feed );
		var indexTo = indexFrom > 0 ? indexFrom - 1 : indexFrom;

		if ( indexFrom !== indexTo ) {
			this.feeds.move( indexFrom, indexTo );

			$scope.$broadcast( 'reload', [
				this.feeds[ indexFrom ].id,
				this.feeds[ indexTo ].id
			] );
		}


	};

	$scope.moveright = function (){
		$log.log( 'move right' )

		var indexFrom = _.indexOf( this.feeds, this.feed );
		var indexTo = indexFrom < this.feeds.length ? indexFrom + 1 : indexFrom;

		if ( indexFrom !== indexTo ) {
			this.feeds.move( indexFrom, indexTo );

			$scope.$broadcast( 'reload', [
				this.feeds[ indexFrom ].id,
				this.feeds[ indexTo ].id
			] );
		}
	};
	// init loading
	$scope.load();
}