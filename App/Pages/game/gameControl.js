'use strict';

var app = angular.module('triangleApp');

app.controller('gameControl', function($rootScope, $scope, dataService, itemRef, $firebase){
	// var array = gameRef.$asObject();
	$scope.bucket = itemRef.$asArray();
	$scope.addItem = function(item) {
		$scope.bucket.$add({
			item: item
		})
	}
})