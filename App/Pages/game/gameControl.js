var app = angular.module('triangleApp');

app.controller('gameControl', function($scope){
	$scope.bucket = 
	$scope.addItem = function() {
		dataService.addItem($scope.addItemInput);
	}
})