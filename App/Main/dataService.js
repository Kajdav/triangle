var app = angular.module('triangleApp');

app.service('dataService', function($firebase, environmentService){
	var ref = '';
	this.newGame = function(gameId) {
		ref = environmentService.getEnv().firebase + '/' + gameId;
		var firebase = new Firebase(ref);
		console.log(ref)
		console.log(firebase)
		console.log($firebase(new Firebase(ref)));
		$location.path('/game');
		return $firebase(new Firebase(ref));
	}
	this.getPlayers = function() {
		return $firebase(new Firebase(ref + '/players'))
	}
	this.getItems = function() {
		return $firebase(new Firebase(ref + '/items'))
	}
})