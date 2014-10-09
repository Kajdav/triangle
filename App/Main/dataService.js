var app = angular.module('triangleApp');

app.service('dataService', function($firebase, environmentService, $location, $rootScope, authService){
	var ref = environmentService.getEnv().firebase + '/' + $rootScope.gameId;
	console.log($rootScope.gameId);


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
		var firebaseUsers = $firebase(new Firebase(userRef));
		return firebaseUsers.$asObject();
	}


	this.newGame = function(gameId) {
		ref = environmentService.getEnv().firebase + '/' + gameId;
		environmentService.saveGameId(gameId);
		this.updateUserGame(gameId);
		var playerId = authService.getUserId();
		var playerObj = {id: playerId, status: 'player', host: true};
		var players = $firebase(new Firebase(this.getPlayersRef() + playerId));
		var playersObj = players.$asArray();
		playersObj.$add(playerObj);
		$location.path('/game');
		return $firebase(new Firebase(ref));
	}
	this.joinGame = function(gameId) {
		ref = environmentService.getEnv().firebase + '/' + gameId;
		environmentService.saveGameId(gameId);
		this.updateUserGame(gameId);
		var playerId = authService.getUserId();
		var playerObj = {id: playerId, status: 'player', host: false};
		var players = this.getPlayers().$asArray();
		players.$add(playerObj);
		$location.path('/game');
		return $firebase(new Firebase(ref));
	}
	this.updateUserGame = function(newGame) {
			var userObj = this.getUserGame();
			console.log(userObj);
			userObj.inGame = newGame;
			userObj.$save();
			console.log(userObj);
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