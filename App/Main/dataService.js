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
	this.getMainItems = function() {
		return $firebase(new Firebase(ref + '/items/main'))
	}
	this.getUser = function(){
		var userRef = environmentService.getEnv().firebase + '/users/' + authService.getUserId() ;
		var firebaseUsers = $firebase(new Firebase(userRef));
		return firebaseUsers.$asObject();
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