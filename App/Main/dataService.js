var app = angular.module('triangleApp');

app.service('dataService', function($firebase, environmentService, $location, $rootScope, authService){
	var ref = environmentService.getEnv().firebase + '/' + $rootScope.gameId;
	console.log($rootScope.gameId);
	this.newGame = function(gameId) {
		ref = environmentService.getEnv().firebase + '/' + gameId;
		environmentService.saveGameId(gameId);
		$location.path('/game');
		return $firebase(new Firebase(ref));
	}

	this.getGame = function() {
		return $firebase(new Firebase(ref));
	}

	this.getPlayers = function() {
		return $firebase(new Firebase(ref + '/players'));
	}

	this.getItems = function() {
		return $firebase(new Firebase(ref + '/items'));
	}
})