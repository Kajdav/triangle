var app = angular.module('triangleApp');

app.controller('joinGameControl', function($scope, $rootScope, dataService, gameService){
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
		$scope.game = gameService.newGame($scope.gameName);
	}
	$scope.joinGame = function(){
		$scope.game = gameService.joinGame($scope.gameId);
	}
})