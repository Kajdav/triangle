var app = angular.module('triangleApp');

app.service('bucketService', function($rootScope, dataService){
	var mainSync;
	var mainArr;
	var tempSync;
	var tempArr;
	$rootScope.$on('userLoaded', function(){
		mainSync = dataService.getMainItems();
		mainArr = mainSync.$asArray();
		tempSync = dataService.getItems();
		tempArr = tempSync.$asArray();
	});
	this.createTemp = function(array){
		for (var i = 0; i < array.length; i++) {
			tempArr.$add(array[i]);
		}
	}
	this.repopulateBucket = function(){
		if (bucketArr.length <= 1){
			for (var i = 0; i < mainArr.length; i++) {
				bucketArr.$add(mainArr[i]);
			}
		} else {
			alert('Round not over!');
		}
	}
	this.addItems = function(array) {
		var arr = dataService.getMainItems().$asArray();
		for (var i = 0; i < array.length; i++) {
			arr.$add(array[i]);
		}
	}
});