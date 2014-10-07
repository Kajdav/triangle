'use strict';

var app = angular.module('triangleApp');

app.controller('gameControl', function($rootScope, $scope, dataService, itemRef){
	// var array = gameRef.$asObject();
	$scope.bucket = itemRef.$asObject();
	console.log($scope.bucket.$id);
	$scope.addItem = function(item) {
		$scope.bucket.$add({
			item: item
		})
	}
})