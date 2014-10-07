var app = angular.module('triangleApp', ['ngRoute', 'firebase']);

app.config(function($routeProvider){
	$routeProvider
		.when('/login', {
			templateUrl: 'App/Pages/login/loginView.html',
			controller: 'loginControl'
		})
		.when('/joinGame', {
			templateUrl: 'App/Pages/joinGame/joinGame.html',
			controller: 'joinGameControl'
		})
		.when('/game', {
			templateUrl: 'App/Pages/game/gameView.html',
			controller: 'gameControl',
			resolve: {
				gameRef: function(dataService) {
					return dataService.getGame();
				},
				itemRef: function(dataService) {
					return dataService.getItems();
				}
			}
		})
		.otherwise({
			redirectTo: '/login'
		})
});

app.run(function($rootScope, $route, $location, $routeParams, environmentService){
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		if(environmentService.getUserName()) {
			$rootScope.username = environmentService.getUserName();
			if(environmentService.getGameId()) {
				$rootScope.gameId = environmentService.getGameId();
				console.log($rootScope.gameId);
			}
			else{
				$location.path('/joinGame');
			}
		}
		else {
			$location.path('/login');
		}
	})
})