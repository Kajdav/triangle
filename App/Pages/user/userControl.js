var app = angular.module('triangleApp');

app.controller('userControl', function($scope){
	$scope.addItem = function() {
		dataService.addItem($scope.addItemInput);
	}
})