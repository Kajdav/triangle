var app = angular.module('triangleApp');

app.controller('gameControl', function($scope, dataService){
	$scope.bucket = dataService.getItems().$asArray();
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