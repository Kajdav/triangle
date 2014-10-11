var app = angular.module('triangleApp');

app.service('dataService', function($firebase, environmentService, $location, $rootScope, authService){
	var ref = environmentService.getEnv().firebase + '/games/' + $rootScope.gameId;
	this.setRef = function(gameId) {
		ref = environmentService.getEnv().firebase + '/games/' + gameId;
	}

	this.getUrl = function(){
		return ref;
	}
	this.getGame = function() {
		return $firebase(new Firebase(ref));
	}
	this.getBasicRef = function(){
		return new Firebase(environmentService.getEnv().firebase);
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
	this.getUserRef = function() {
		return environmentService.getEnv().firebase + '/users/' + authService.getUserId();
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

})

//Game URL can't include: ., #, $, [, or ]
//Game URL is case sensitive.