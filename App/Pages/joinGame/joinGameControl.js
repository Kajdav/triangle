var app = angular.module('triangleApp');

app.controller('joinGameControl', function($scope, dataService){
	var firebaseUrl = dataService.firebaseUrl;
	$scope.showCreateGameForm = false;
	$scope.showJoinGameForm = false;
	$scope.toggleNewGame = function(){
		$scope.showCreateGameForm = true;
		$scope.showJoinGameForm = false;
		$scope.gameName = '';
		$scope.gamePassword = '';
	}
	$scope.toggleJoinGame = function(){
		$scope.showCreateGameForm = false;
		$scope.showJoinGameForm = true;
		$scope.gameId = '';
		$scope.gamePassword = '';
	}
	$scope.newGame = function(){
		$scope.game = dataService.newGame($scope.gameName);
	}
	$scope.joinGame = function(){
		$scope.game = dataService.joinGame($scope.gameName);
	}
})