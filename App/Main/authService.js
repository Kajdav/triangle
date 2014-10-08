var app = angular.module('triangleApp');

app.service('authService', function(environmentService){
	var firebaseUrl = environmentService.getEnv().firebase;
	var firebaseLogin = new Firebase(firebaseUrl);
	console.log(firebaseUrl);
	console.log(firebaseLogin);

	this.register = function(user, cb){
		firebaseLogin.createUser({
			email: user.email,
			password: user.password
		}, function(error) {
			if (error === null) {
				console.log('User created successfully');
				firebaseLogin.authWithPassword({
					email : user.email,
					password : user.password
				}, function(err, authData) {
					if (authData) {
						authData.name = user.name;
						authData.timestamp = new Date().toISOString();
						firebaseLogin.child('users').child(authData.uid.replace('simplelogin:', '')).set(authData);
						cb(authData);
					} else{
						console.log('something went wrong');
					}
				});
			} else {
				console.log('Error creating user:', error);
				return false;
			}
		});
	}
	this.login = function(user, cb) {
		firebaseLogin.authWithPassword({
			email : user.email,
			password: user.password
		}, function(err, authData){
			if (err) {
				switch (err.code) {
					case 'INVALID_EMAIL':

					case 'INVALID_PASSWORD':

					default:
				}
			} else if (authData) {
				console.log('Logged In! User ID: ' + authData.uid);
				cb(authData);
			}
		});
	}
});