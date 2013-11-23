/**
 * src/js/controllers/FeedController.js
 * @author Christian Jung <campino2k@gmail.com>
 * @since 2013-10-17 21:52
 */

function FeedController( $scope, $http, $log, $element, $timeout, $interval ){
	// default vars

	var reloadInterval;
	var reloadTrigger;

	$scope.reloadTime = 5;
	$scope.edit_mode = false;

	$scope.loadItems = function (){
		// load items per feed
		$element.find( 'div' ).addClass( 'loading' );
		$http.post( 'get_feed.php', {
				"feed_id": $scope.feed.id,
				"feed_url": $scope.feed.feedUrl
			}, {
				/*
				 HINT from http://stackoverflow.com/questions/11442632/how-can-i-make-angular-js-post-data-as-form-data-instead-of-a-request-payload
				 */
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function ( obj ){
					var str = [];
					for ( var p in obj )
						str.push( encodeURIComponent( p ) + "=" + encodeURIComponent( obj[p] ) );
					return str.join( "&" );
				}
			}
		).success( function ( data ){
				// use the div, since jqLites .find does only support tag names as selectors
				$element.find( 'div' ).removeClass( 'loading' );
				// load only max entries into the feed
				if ( data.data ) {
					$scope.feeditems = data.data.splice( 0, $scope.feed.entries );
				} else {
					// TODO error handling
				}

			} );
	}

	$scope.reload = function (){
		$scope.loadItems();
	}
	$scope.edit = function (){
		$scope.edit_mode = $scope.edit_mode ? false : true;
	}
	$scope.save = function (){
		$scope.edit_mode = $scope.edit_mode ? false : true;

		/*
		 TODO: Save the FeedListController-List
		 */
		$scope.reload();
	}

	$scope.toggle = function ( item ){
		console.log( item )
		item.isOpen = item.isOpen ? false : true;
		//$scope.apply();
		//$scope.isOpen = $scope.isOpen ? false : true;
	};

	$scope.display = function ( item ){
//		return $scope.isOpen ? " open " : " close ";
	};

	$scope.$on( 'reload', function ( event, feedsToReload ){
		if ( _.indexOf( feedsToReload, $scope.feed.id ) > -1 ) {

			/*
			 Simulate a callback for the broadcast reciever with $setTimeout
			 This solves a racing condition where the reload is fired BEFORE
			 the feeds places have changed
			 */
			reloadTrigger = $timeout( function (){
				$scope.reload();
			}, 0 )
		}
	} );

	$scope.loadItems();

	reloadInterval = $interval(function(){
		$scope.reload();

		/*
		TODO: Make this configurable
		 */
	}, (1000*60* $scope.reloadTime))
}