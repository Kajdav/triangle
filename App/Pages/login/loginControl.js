var app = angular.module('triangleApp');

app.controller('loginControl', function($scope, $rootScope, environmentService, $location, authService){
	$scope.registerShow = false;
	$scope.loginShow = false;
	var authData;
	$scope.login = function() {
		var userObj = {
			email: $scope.userEmail,
			password: $scope.userPassword
		}
		console.log(userObj)
		$location.path('/joinGame');
		authService.login(userObj, function(data){
			authData = data;
			$rootScope.$broadcast('credsChanged');
		});
	}
	$scope.register = function() {
		var userObj = {
			email: $scope.userEmail,
			password: $scope.userPassword,
			name: $scope.userName
		}
		authService.register(userObj, function(data){
			$rootScope.$broadcast('credsChanged');
			$location.path('/joinGame');
		});
	}
	$scope.toggleRegister = function(){
		$scope.registerShow = true;
		$scope.loginShow = false;
		$scope.userEmail = '';
		$scope.userPassword = '';
		$scope.userName = '';
	}
	$scope.toggleLogin = function(){
		$scope.registerShow = false;
		$scope.loginShow = true;
		$scope.userEmail = '';
		$scope.userPassword = '';
		$scope.userName = '';
	}
})