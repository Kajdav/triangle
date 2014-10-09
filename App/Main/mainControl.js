var app = angular.module('triangleApp');

app.controller('mainControl', ['$timeout', '$scope', '$rootScope', '$firebase', 'dataService', 'authService', function($timeout, $scope, $rootScope, $firebase, dataService, authService){
	// $scope.currentUser = dataService.getUser();
	$scope.user = dataService.getUser();
	$scope.headerShow = false;
	// var update = function(){
	// 	$scope.currentUser = $rootScope.username;
	// 	$scope.gameId = $rootScope.gameId;
	// }
	// update();
	// $scope.$on('run:userNameUpdate', function(){
	// 	update();
	// })
	// $scope.$on('run:gameIdUpdate', function(){
	// 	update();
	// })
	var evalGame = function(){
		$timeout(function(){
			console.log($scope.user);
			$scope.headerShow = true;
			if ($scope.user.inGame) {
				$scope.leaveGameShow = true;
				$scope.joinGameShow = false;
				console.log('true');
			} else {
				$scope.leaveGameShow = false;
				$scope.joinGameShow = true;
				console.log('false');
			}
		}, 700);
	}
	// $scope.$watch('user', function(){
	// 	console.log($scope.user);
	// 	evalGame();
	// })
	evalGame();
	$rootScope.$on('credsChanged', function(){
		evalGame();
	})
	// $timeout(function(){
	// 	evalGame();
	// 	console.log($scope.user)
	// }, 700);
}])