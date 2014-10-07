var app = angular.module('triangleApp');

app.controller('loginControl', function($scope, dataService){
	$scope.test = dataService.firebaseUrl;
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

	}
})