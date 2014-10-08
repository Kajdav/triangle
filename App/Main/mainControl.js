var app = angular.module('triangleApp');

app.controller('mainControl', function($scope, $rootScope, dataService, authService){
	// $scope.currentUser = dataService.getUser();
	var update = function(){
		$scope.currentUser = $rootScope.username;
		$scope.gameId = $rootScope.gameId;
	}
	update();
	$scope.$on('run:userNameUpdate', function(){
		update();
	})
	$scope.$on('run:gameIdUpdate', function(){
		update();
	})
})