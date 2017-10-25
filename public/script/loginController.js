myApp.controller('loginCtrl', ['$scope', '$http', 'ADD_SERVICE', '$location', '$cookies',
	function($scope, $http, ADD_SERVICE, $location, $cookies) {

    $scope.loginjson = {};
    let reqheader = {'Content-Type' : "application/json"};

    console.log($location);

    $scope.login = function () {
        if($scope.loginjson.EMAIL && $scope.loginjson.PASSWORD){
            let reqdata = $scope.loginjson;
			$http.post('login/check_login',reqdata,reqheader)
				.then(function(response){

                    $scope.loginjson.RESPONSE = response.data;      
                    if($scope.loginjson.RESPONSE.success){
                        $cookies.putObject('LOGGED_USER', $scope.loginjson.RESPONSE.data);
                        ADD_SERVICE.LOGGED_USER = $scope.loginjson.RESPONSE.data;
                        
                        $location.path('/dashboard');
                    }
				}).catch(function (err) {
                    console.log(err)  
                });
        }else{
            alert("please fill Email ID & Password properly.")
        }
    }    

    // get all user so that admin created at first time
	$scope.getall_user = function (){
		$http.get('/user/getall_user',reqheader)
		.then(function(res){
			
		}).catch(function(err) {
			console.log(err);
		});
    };
    $scope.getall_user();

}]);