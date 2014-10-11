var app = angular.module('triangleApp');

app.service('rootService', function($rootScope, dataService, authService){
	this.bindUser = function(){
		if(authService.getAuthentication()){
			var user = dataService.getUser();
			user.$bindTo($rootScope, 'user').then(function(unbind){
				$rootScope.unbindUser = unbind;
				$rootScope.$broadcast('userLoaded');
			})
		} else if($rootScope.unbindUser) {
			$rootScope.unbindUser();
			$rootScope.user = false;
		} else {
			$rootScope.user = false;
		}
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