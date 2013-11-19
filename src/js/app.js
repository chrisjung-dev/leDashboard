/**
 * src/js/app.js
 * @author Christian Jung <campino2k@gmail.com>
 * @since 2013-10-17 22:26
 */
var leDashboard = angular.module( 'leDashboard', [
		'ngRoute',
		'leDashboardControllers',
		'leDashboardServices'
	] )
	.run( function ( $log ){
		$log.log( 'leDashboard läuft...' );
	} );

/*
 TODO: Enable Routing
 leDashboard.config(['$routeProvider',
 function($routeProvider) {
 $routeProvider.
 when('/login', {
 templateUrl: 'show/login.php',
 controller: 'LoginController'
 }).
 otherwise({
 redirectTo: '/feeds'
 });
 }
 ]);
 */
