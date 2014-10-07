var app = angular.module('triangleApp');

app.service('environmentService', function($window){
	this.getEnv = function(){
		return $window.env;
	}
})