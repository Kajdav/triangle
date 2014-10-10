var app = angular.module('triangleApp');

app.controller('mainControl', ['$timeout', '$scope', '$rootScope', '$firebase', 'dataService', 'authService', '$location',
	function($timeout, $scope, $rootScope, $firebase, dataService, authService, $location){
	var updateUser = function(){
		var userObj = dataService.getUser();
		userObj.$bindTo($scope, 'user');
	}
	$scope.leaveGame = function(){
		dataService.leaveGame($scope.user.inGame);
	}

	$rootScope.$on('credsChanged', function(){
		updateUser();
		$scope.game = dataService.getGame().$asObject();
		console.log('credsChanged');
	})

	updateUser();
	$scope.game = dataService.getGame().$asObject();
	console.log($scope.game);

}])