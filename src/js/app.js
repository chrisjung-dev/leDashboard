var leDashboard = angular.module('leDashboard', [
  'ngRoute',
  
  'FeedController',
  'FeedItemsController'
]);


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
  }]);