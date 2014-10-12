var app = angular.module('triangleApp');

app.controller('gameControl', function($scope, $rootScope, $timeout, $firebase, dataService, gameService){
	$scope.meanTimeShow = false;
	if ($rootScope.user){
	}
	$rootScope.$on('userLoaded', function() {
		$scope.bucket = dataService.getItems().$asArray();
		$scope.game = dataService.getGame().$asObject();
		$scope.game.$loaded()
			.then(function(){
				if (!$scope.game.score){
					dataService.getGameRef().child('score').child('team1').set(0);
					dataService.getGameRef().child('score').child('team2').set(0);
				}
			});
	});
	$scope.teamUp = 'team1';
	$scope.notTaken = true; //put this on firebase
	$rootScope.$on('userLoaded',function(){
		$scope.bucket = dataService.getItems().$asArray();
		var game = dataService.getGame().$asObject();
		game.$bindTo($scope, 'game');
	});
	$scope.startShow = true;
	$scope.startTimer = function(){ //put this on firebase
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
		displayItem();
	}
	var displayItem = function() {
		var randomNumber = Math.floor(Math.random() * ($scope.bucket.length));
		$scope.currentItem = $scope.bucket[randomNumber];
		$scope.number = randomNumber;
	}
	$scope.claimIt = function() {
		gameService.updatePlayerStatus('it');
		$scope.notTaken = false;
	}
	$scope.claimItem = function() {
		$scope.game.score[$scope.user.team] = $scope.game.score[$scope.user.team] + 1;
		$scope.bucket.$remove($scope.currentItem);
		displayItem();
	}
});