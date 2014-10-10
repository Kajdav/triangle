var app = angular.module('triangleApp');

app.service('dataService', function($firebase, environmentService, $location, $rootScope, authService){
	var ref = environmentService.getEnv().firebase + '/games/' + $rootScope.gameId;


	this.getGame = function() {
		return $firebase(new Firebase(ref));
	}
	this.getPlayersRef = function() {
		return (ref + '/players/');
	}
	this.getItems = function() {
		return $firebase(new Firebase(ref + '/items'));
	}
	this.getMainItems = function() {
		return $firebase(new Firebase(ref + '/items/main'))
	}
	this.getUser = function(){
		var userRef = environmentService.getEnv().firebase + '/users/' + authService.getUserId();
		var firebaseUsers = $firebase(new Firebase(userRef));
		return firebaseUsers.$asObject();
	}
	this.getUserGame = function() {
		var userRef = environmentService.getEnv().firebase + '/users/' + authService.getUserId() + '/inGame';
		return $firebase(new Firebase(userRef));
	}


	this.newGame = function(gameId) {
		ref = environmentService.getEnv().firebase + '/games/' + gameId;
		environmentService.saveGameId(gameId);
		this.updateUserGame(gameId);
		var playerId = authService.getUserId();
		var players = $firebase(new Firebase(this.getPlayersRef() + playerId));
		players.$set({
			id: playerId, status: 'player', host: true
		});
		this.getGame().$set('status', false)
		$location.path('/preGame');
		$rootScope.$broadcast('credsChanged');
		return $firebase(new Firebase(ref));
	}
	this.joinGame = function(gameId) {
		ref = environmentService.getEnv().firebase + '/games/' + gameId;
		environmentService.saveGameId(gameId);
		this.updateUserGame(gameId);
		var playerId = authService.getUserId();
		var players = $firebase(new Firebase(this.getPlayersRef() + playerId));
		players.$set({
			id: playerId, status: 'player', host: false
		});
		$location.path('/preGame');
		$rootScope.$broadcast('credsChanged');
		return $firebase(new Firebase(ref));
	}
	this.leaveGame = function(gameId){
		var playerId = authService.getUserId();
		var players = $firebase(new Firebase(this.getPlayersRef()));
		players.$remove(playerId)
			.then(console.log('user removed from game'));
		$location.path('/joinGame');
		// ref = environmentService.getEnv().firebase + '/games/' + gameId;
		environmentService.saveGameId(false);
		this.updateUserGame(false);
	}
	this.updateUserGame = function(newGame) {
			var userObj = this.getUserGame();
			userObj.$set(newGame);
			// userObj.$save();
	}
	this.addItems = function(array) {
		var arr = this.getItems().$asArray();
		for (var i = 0; i < array.length; i++) {
			arr.$add(array[i]);
		}
	}


})

//Game URL can't include: ., #, $, [, or ]
//Game URL is case sensitive.