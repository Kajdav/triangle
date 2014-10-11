var app = angular.module('triangleApp');

app.controller('mainControl', ['$timeout', '$scope', '$rootScope', '$firebase', 'dataService', 'authService', '$location', 'gameService',
	function($timeout, $scope, $rootScope, $firebase, dataService, authService, $location, gameService){
	var updateUser = function(){
		if(authService.getAuthentication()){
			console.log('authenticated')
			var userObj = dataService.getUser();
			userObj.$bindTo($scope, 'user').then(function(unbind){
				$scope.unbindUser = unbind;
				joinGameShowTest();
			});
		} else if ( $scope.unbindUser ) {
			$scope.unbindUser();
			$scope.user = false;
			joinGameShowTest();
			console.log('else if');
		} else {
			$scope.user = false;
			joinGameShowTest();
			console.log('else');
		}
	}
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
		dataService.getBasicRef().unauth();
		updateUser();
		$location.path('/login');
	}
	$rootScope.$on('credsChanged', function(){
		if ($scope.user){$scope.unbindUser();}
		updateUser();
	});
	$scope.$watch('user', function(){
		joinGameShowTest();
	})
	// updateUser();
	$scope.user = $rootScope.user;
	$timeout(function(){
		console.log($rootScope.user);
		console.log($scope.user);
	}, 2000)
}])