var leDashboard = angular.module('leDashboard', [
  'ngRoute'
]);


leDashboard.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/phone-list.html',
        controller: 'FeedController'
      }).
      otherwise({
        redirectTo: '/feeds'
      });
  }]);