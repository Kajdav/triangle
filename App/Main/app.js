var app = angular.module('triangleApp', ['ngRoute', 'firebase']);

app.config(function($routeProvider){
	$routeProvider
		.when('/login', {
			templateUrl: 'App/Pages/login/loginView.html',
			controller: 'loginControl'
		})
		.when('/joinGame', {
			templateUrl: 'App/Pages/joinGame/joinGameView.html',
			controller: 'joinGameControl'
		})
		.when('/preGame', {
			templateUrl: 'App/Pages/preGame/preGameView.html',
			controller: 'preGameControl',
			resolve: {
				gameRef: function(dataService) {
					return dataService.getGame();
				},
				itemRef: function(dataService) {
					return dataService.getItems();
				}
			}
		})
		.when('/game', {
			templateUrl: 'App/Pages/game/gameView.html',
			controller: 'gameControl'
		})
		.otherwise({
			redirectTo: '/login'
		})
});

app.run(function($rootScope, $route, $location, $routeParams, environmentService, authService, dataService, rootService){
	var check = function() {
		if(!authService.getAuthentication()) {
			$location.path('/login');
		}
	}
	check();
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		check();
	})
	rootService.bindUser();
	rootService.bindGame();
})