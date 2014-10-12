var app = angular.module('triangleApp');

app.service('gameService', function(dataService, $firebase, environmentService, $location, $rootScope, authService){
	this.newGame = function(gameId) {
		$rootScope.gameId = gameId;
		this.updateUserGame(gameId);
		this.updateUserHost(true);
		this.updatePlayerStatus('player');
		// var playerId = authService.getUserId();
		// var player = $firebase(new Firebase(dataService.getPlayersRef() + playerId));
		// player.$set({
		// 	id: playerId, status: 'player', host: true
		// });
		dataService.getGame().$set('status', false);
		dataService.getGame().$set('team1', 0);
		dataService.getGame().$set('team2', 0);
		$location.path('/preGame');
		$rootScope.$broadcast('credsChanged');
		return $firebase(new Firebase(dataService.getUrl()));
	}
	this.joinGame = function(gameId) {
		ref = environmentService.getEnv().firebase + '/games/' + gameId;
		this.updateUserGame(gameId);
		this.updateUserHost(false);
		var playerId = authService.getUserId();
		var players = $firebase(new Firebase(ref + '/players/' + playerId));
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
		// $rootScope.gameId = newGame;
		$rootScope.$broadcast('credsChanged');
	}
	this.updateUserHost = function(boolean) {
		var userUrl = dataService.getUserRef();
		var userRef = new Firebase(userUrl);
		userRef.child('host').set(boolean);
	}
	this.updatePlayerStatus = function(status) {
		var userUrl = dataService.getUserRef();
		var userRef = new Firebase(userUrl);
		userRef.child('playerStatus').set(status);
	}
})