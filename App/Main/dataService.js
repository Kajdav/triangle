var app = angular.module('triangleApp');

app.service('dataService', function($firebase, environmentService, $location, $rootScope, authService){
	// this.setRef = function() {
	// 	ref = environmentService.getEnv().firebase + '/games/' + $rootScope.user.inGame;
	// }
	this.getUrl = function(){
		return (environmentService.getEnv().firebase + '/games/' + $rootScope.user.inGame);
	}
	this.getGame = function() {
		return $firebase(new Firebase(this.getUrl()));
	}
	this.getBasicRef = function(){
		return new Firebase(environmentService.getEnv().firebase);
	}
	this.getPlayersRef = function() {
		return (this.getUrl() + '/players/');
	}
	this.getItems = function() {
		return $firebase(new Firebase(this.getUrl() + '/items/temp'));
	}
	this.getMainItems = function() {
		return $firebase(new Firebase(this.getUrl() + '/items'))
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