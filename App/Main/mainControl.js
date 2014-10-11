var app = angular.module('triangleApp');

app.controller('mainControl', ['$timeout', '$scope', '$rootScope', '$firebase', 'dataService', 'authService', '$location', 'gameService',
	function($timeout, $scope, $rootScope, $firebase, dataService, authService, $location, gameService){
	function joinGameShowTest() {
		if ($scope.user && $scope.user.inGame === false) {
			$scope.joinGameShow = true;
		} else {
			$scope.joinGameShow = false;
		}
	}
	$scope.leaveGame = function(){
		gameService.leaveGame($scope.user.inGame);
	}
	$scope.logout = function() {
		console.log('logging out')
		dataService.getBasicRef().unauth();
		$rootScope.unbindUser();
		$scope.user = false;
		$rootScope.$broadcast('credsChanged');
		$location.path('/login');
	}
	$rootScope.$on('credsChanged', function(){
		if ($scope.user){$scope.unbindUser();}
	});
	$scope.$watch('user', function(){
		joinGameShowTest();
	})
	$rootScope.$on('userLoaded', function(){
		$scope.user = $rootScope.user;
		console.log('BOUND!');
	})
}])