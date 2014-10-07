var app = angular.module('triangleApp');

app.controller('mainControl', function($scope, dataService){
	var firebase = new Firebase('https://triangle.firebaseio.com');
	var test = function(text) {
		firebase.child('game').child('hi!').set(text)
	}
	test('hi23')
})