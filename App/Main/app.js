var app = angular.module('triangleApp', ['ngRoute', 'firebase']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'App/Pages/login/loginView.html',
			controller: 'loginControl'
		})
		.when('/:gameId/user', {
			templateUrl: 'App/Pages/user/userView.html',
			controller: 'userControl'
		})
});