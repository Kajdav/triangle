var app = angular.module('triangleApp');

app.service('environmentService', function($window){
	this.getEnv = function(){
		return $window.env;
	}
	// this.saveUserName = function(username) {
	// 	$window.localStorage.setItem('username', username);
	// }
	// this.getUserName = function(){
	// 	return $window.localStorage.getItem('username');
	// }
	// this.saveGameId = function(gameId) {
	// 	$window.localStorage.setItem('gameId', gameId);
	// }
	// this.getGameId = function(){
	// 	return $window.localStorage.getItem('gameId');
	// }
});