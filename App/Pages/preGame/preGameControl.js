'use strict';

var app = angular.module('triangleApp');
app.controller('gameControl', function($rootScope, $scope, dataService, itemRef, $firebase, bucketService){
	$scope.addtoBucketShow = true;
	$scope.addtoBucketInputShow = true;
	$scope.addtoBucketConfirmShow = false;
	$scope.gameplayShow = false;
	$scope.bucket = itemRef.$asArray();
	$scope.addtoBucket = [];
	$scope.addItem = function(item) {
		$scope.addtoBucket.push({item: item});
		$scope.addItemInput = '';
		if ($scope.addtoBucket.length >= 3) {
			$scope.addtoBucketInputShow = false;
			$scope.addtoBucketConfirmShow = true;
		}
	}
	$scope.dumpInBucket = function() {
		// $scope.bucket.$add($scope.addtoBucket);
		// console.log($scope.bucket);
		dataService.addItems($scope.addtoBucket);
		$scope.addtoBucket = [];
		$scope.addtoBucketConfirmShow = false;
		$scope.gameplayShow = true;
	}
	$scope.startGame = function() {
		bucketService.createMain($scope.bucket);
	}
	$scope.repopulateBucket = function() {
		bucketService.repopulateBucket();
	}
})

