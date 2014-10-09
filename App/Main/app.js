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
		.when('/preGame', {
			templateUrl: 'App/Pages/preGame/preGameView.html',
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
	var check = function() {
		// if(environmentService.getUserName()) {
			// $rootScope.username = environmentService.getUserName();
			// $rootScope.$broadcast('run:userNameUpdate');
			if(environmentService.getGameId()) {
				$rootScope.gameId = environmentService.getGameId();
				// $rootScope.$broadcast('run:gameIdUpdate');
			}
			else{
				$location.path('/joinGame');
			}
		// }
		// else {
		// 	$location.path('/login');
		// }
	}
	check();
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		check();
	})
})