var leDashboard = angular.module('leDashboard', []);

//leDashboard.controller( 'FeedItemsController' = 
function FeedItemsController ( $scope, $http ){
	// default vars
	$scope.isOpen = false;
	
	// load items per feed
	$http.post( 'get_feed.php', 
		{
			"feed_id": $scope.feed.id,
			"feed_url": $scope.feed.feedUrl
		},
		{
			/*
			 *	HINT from http://stackoverflow.com/questions/11442632/how-can-i-make-angular-js-post-data-as-form-data-instead-of-a-request-payload 
			 */
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
		}
	).success( function(data){
		$( '#' + $scope.feed.id + ' .loading' ).removeClass( 'loading' );
		// load only max entries into the feed
		$scope.feeditems = data.data.splice( 0, $scope.feed.entries );
		
	});
	
	$scope.toggle = function( item ){
		console.log( item )
		item.isOpen = item.isOpen ? false : true;
		//$scope.apply();
		//$scope.isOpen = $scope.isOpen ? false : true;
	};
	
	$scope.display = function(){
		//return $scope.isOpen ? " open " : " close "; 
	};
	
}
//);