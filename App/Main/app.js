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
			controller: 'gameControl'
		})
		.otherwise({
			redirectTo: '/login'
		})
});

app.run(function($rootScope, $route, $location, $routeParams, environmentService){
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		if(environmentService.getUserName()) {
			$rootScope.username = environmentService.getUserName()
		}
		else {
			$location.path('/login');
		}
	})
})