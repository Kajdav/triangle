var app = angular.module('triangleApp');

app.service('rootService', function($rootScope, dataService){
	this.bindUser = function(){
		var user = dataService.getUser();
		user.$bindTo($rootScope, 'user').then(function(unbind){
			$rootScope.unbindUser = unbind;
		})
	}
	this.bindGame = function(){
		if ($rootScope.user){
			$rootScope.gameId = $rootScope.user.inGame;
		}
		$rootScope.$watch('user', function(){
			if ($rootScope.user){
				$rootScope.gameId = $rootScope.user.inGame;
			}
		})
	}
})