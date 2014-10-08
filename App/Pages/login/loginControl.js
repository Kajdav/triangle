var app = angular.module('triangleApp');

app.controller('loginControl', function($scope, environmentService, $location, authService){
	$scope.registerShow = false;
	$scope.loginShow = false;
	var authData;
	$scope.login = function() {
		var userObj = {
			email: $scope.userEmail,
			password: $scope.userPassword
		}
		console.log(userObj)
		environmentService.saveUserName(userObj.name);
		$location.path('/joinGame');
		authService.login(userObj, function(data){
			authData = data;
		});
	}
	$scope.register = function() {
		var userObj = {
			email: $scope.userEmail,
			password: $scope.userPassword,
			name: $scope.userName
		}
		console.log(userObj)
		environmentService.saveUserName(userObj.name);
		$location.path('/joinGame');
		authService.register(userObj, function(data){
			console.log(data);
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