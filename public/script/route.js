let myApp = angular.module('myApp',['ngRoute','ngTable','ngMaterial','ngCookies']);


myApp.config(["$routeProvider", function ($routeProvider) {

	$routeProvider
	.when('/login', {
		templateUrl : 'content/login.html',
		controller : 'loginCtrl'
	})
	.when('/dashboard', {
		templateUrl : 'content/home.html',
		controller : 'homeCtrl'
	})
	.otherwise({
		redirectTo : '/login'
	});
}])