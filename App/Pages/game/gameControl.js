var app = angular.module('triangleApp');

app.controller('gameControl', function($scope, $rootScope, $timeout, dataService){
	if ($rootScope.user){
		$scope.bucket = dataService.getItems().$asArray();
		$scope.game = dataService.getGame().$asObject();
	}
	$rootScope.$on('userLoaded',function(){
		$scope.bucket = dataService.getItems().$asArray();
		$scope.game = dataService.getGame().$asObject();
		console.log(dataService.getUrl());
		console.log($scope.bucket);
	});
	$scope.startShow = true;
	$scope.startTimer = function(){
		$scope.startShow = false;
		$scope.counter = 90;
		var timer = setInterval(function () {
		    if ($scope.counter > 0) {
		        $scope.counter--;
		    } else {
		        alert("Time's up!");
		        clearInterval(timer);
		    }
		}, 1000);
	}
});