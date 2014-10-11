var app = angular.module('triangleApp');

app.service('gameService', function(dataService, $firebase, environmentService, $location, $rootScope, authService){
	this.newGame = function(gameId) {
		$rootScope.gameId = gameId;
		// ref = environmentService.getEnv().firebase + '/games/' + gameId;
		dataService.setRef(gameId);
		// console.log(ref);
		this.updateUserGame(gameId);
		var playerId = authService.getUserId();
		var players = $firebase(new Firebase(dataService.getPlayersRef() + playerId));
		players.$set({
			id: playerId, status: 'player', host: true
		});
		dataService.getGame().$set('status', false)
		$location.path('/preGame');
		$rootScope.$broadcast('credsChanged');
		return $firebase(new Firebase(dataService.getRef()));
	}
	this.joinGame = function(gameId) {
		ref = environmentService.getEnv().firebase + '/games/' + gameId;
		environmentService.saveGameId(gameId);
		this.updateUserGame(gameId);
		var playerId = authService.getUserId();
		var players = $firebase(new Firebase(dataService.getPlayersRef() + playerId));
		players.$set({
			id: playerId, status: 'player', host: false
		});
		$location.path('/preGame');
		$rootScope.$broadcast('credsChanged');
		return $firebase(new Firebase(ref));
	}
	this.leaveGame = function(gameId){
		var playerId = authService.getUserId();
		var players = $firebase(new Firebase(dataService.getPlayersRef()));
		players.$remove(playerId)
			.then(console.log('user removed from game'));
		$location.path('/joinGame');
		this.updateUserGame(false);
	}
	this.updateUserGame = function(newGame) {
		var userObj = dataService.getUserGame();
		userObj.$set(newGame);
		$rootScope.gameId = newGame;
		$rootScope.$broadcast('gameChanged');
	}
	this.addItems = function(array) {
		var arr = dataService.getItems().$asArray();
		for (var i = 0; i < array.length; i++) {
			arr.$add(array[i]);
		}
	}
})