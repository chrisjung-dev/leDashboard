var FeedController = function( $scope, $http ){
	$http.get( 'read_feed_config.php' ).success(function( data ){
		$scope.feeds = data;
		
		for( feed in data ){
			console.log( data[ feed ] )
		}
	});

	$scope.reload = function(){
		console.log( "reload: " + this.feed.feedUrl );
	};
	
	$scope.load = function(){
		$http.post( 'get_feed.php', {
			"feed_id": this.feed.id,
			"feed_url": this.feed.feedUrl
		} ).success( function(data){
			console.log( data );
		});
	};
	
	
};