var app = angular.module('triangleApp');

app.controller('loginControl', function($scope, environmentService, $location){
	$scope.login = function() {
		environmentService.saveUserName($scope.userName);
		$location.path('/joinGame');
	}
})