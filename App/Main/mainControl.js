var app = angular.module('triangleApp');

app.controller('mainControl', ['$timeout', '$scope', '$rootScope', '$firebase', 'dataService', 'authService', '$location', 'gameService',
	function($timeout, $scope, $rootScope, $firebase, dataService, authService, $location, gameService){
	var updateUser = function(){
		if(authService.getAuthentication()){
			var userObj = dataService.getUser();
			userObj.$bindTo($scope, 'user').then(function(unbind){
				$scope.unbindUser = unbind;
				$scope.joinGameShow = joinGameShowTest();
			});
		} else {
			$scope.user = false;
		}
	}
	$scope.leaveGame = function(){
		gameService.leaveGame($scope.user.inGame);
	}
	$scope.logout = function() {
		dataService.getBasicRef().unauth();
		$scope.unbindUser();
		$scope.user = false;
		$location.path('/login');
		debugger;
	}
	$rootScope.$on('credsChanged', function(){
		if ($scope.user){$scope.unbindUser();}
		updateUser();
		console.log('credsChanged');
	});
	updateUser();
	var joinGameShowTest = function() {
		if ($scope.user.inGame === false && $scope.user) {
			return true;
		} else {
			return false;
		}
	}
	$scope.joinGameShow = false;
}])