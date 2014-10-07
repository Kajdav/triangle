var app = angular.module('triangleApp');

app.service('dataService', function($firebase, environmentService){
	this.firebaseUrl = environmentService.getEnv().firebase;
	this.newGame = function() {
		var gameId = '???'
		firebase.child('game').set(gameId)
	}
	this.addItem = function(text) {

	}
})