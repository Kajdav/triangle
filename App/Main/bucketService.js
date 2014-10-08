var app = angular.module('triangleApp');

app.service('bucketService', function(dataService){
	var mainSync = dataService.getMainItems();
	var mainArr = mainSync.$asArray();
	var bucketSync = dataService.getItems();
	var bucketArr = bucketSync.$asArray();
	this.createMain = function(array) {
		for (var i = 0; i < array.length; i++) {
			mainArr.$add(array[i]);
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
})