/**
 * src/js/controllers/_prefix.js
 * @author Christian Jung <campino2k@gmail.com>
 * @since 2013-10-17 21:52 
 */


var leDashboardControllers = angular.module('leDashboardControllers', [])
    .controller( "FeedListController", FeedListController )
    .controller( "FeedController", FeedController);