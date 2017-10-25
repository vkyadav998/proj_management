/**
 * Created by pc on 14-05-2016.
 */
let app = angular.module('myApp');
app.service('ADD_SERVICE',["$http", "$window", "$timeout", "$location", "$cookies",
    function($http, $window, $timeout, $location, $cookies){

    // ROLE
    this.LOGGED_USER = $cookies.getObject('LOGGED_USER');

    // log Out
	this.logOut = function () {
        $location.path('/login');
        this.LOGGED_USER = undefined;
        $cookies.remove('LOGGED_USER');
    };

    this.checkForLogin = function () {
        if(!this.LOGGED_USER){
            $location.path('/login');
        }
    }

}]);