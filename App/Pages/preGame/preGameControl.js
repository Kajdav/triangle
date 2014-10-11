'use strict';

var app = angular.module('triangleApp');
app.controller('preGameControl', function($rootScope, $scope, $location, dataService, $firebase, bucketService, gameService){
	$rootScope.$on('userLoaded', function(){
		$scope.addtoBucketShow = true;
		$scope.addtoBucketInputShow = true;
		$scope.addtoBucketConfirmShow = false;
		$scope.gameplayShow = false;
		$scope.bucket = dataService.getMainItems().$asArray();
		$scope.addtoBucket = [];
	})
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
		bucketService.addItems($scope.addtoBucket);
		$scope.addtoBucket = [];
		$scope.addtoBucketConfirmShow = false;
		$scope.gameplayShow = true;
	}
	$scope.startGame = function() {
		bucketService.createTemp($scope.bucket);
		dataService.getGame().$set('status', 'waiting');
		$location.path('/game');
	}
	$scope.repopulateBucket = function() {
		bucketService.repopulateBucket();
	}
	// var ref = new Firebase(dataService.getPlayersRef());
	// // console.log($firebase(ref.child('players').$asArray()));
	// console.log(ref.$asObject())
	// console.log(dataService.getUrl())
})

