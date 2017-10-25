myApp.controller('homeCtrl', ['$scope', '$http', '$window', 'ADD_SERVICE', 'NgTableParams', '$timeout', '$location',
	function($scope, $http, $window, ADD_SERVICE, NgTableParams, $timeout, $location) {


	if(!ADD_SERVICE.LOGGED_USER){
		$location.path('/login');
	}	
	// initialization
	$scope.refJson = {
		"PROJECT_LIST" : [],
		"USER_LIST" : [],

		"PROJECT" : {},
		"USER" : {},
		
	};

	$scope.tempjson = {
		"showProject" : true,
	};

	let reqheader = {'Content-Type' : "application/json"};

	// get all project
    $scope.getall_project = function (){
				
		$http.get('/project/getall_project', reqheader)
		.then(function (res) {
			$scope.refJson.PROJECT_LIST = res.data.allItom;
			let cnt = ($scope.refJson.PROJECT_LIST.length >7)?[5,10,50]:[];

			$scope.tableProjectParams = new NgTableParams({}, { dataset: $scope.refJson.PROJECT_LIST, counts:cnt});
		}).catch(function (err) {
			console.log(err);
		})
    };

	// add single project
	$scope.add_project = function (){
		if($scope.refJson.PROJECT.NAME){
			let reqdata = $scope.refJson.PROJECT;
			$http.post('project/add_project',reqdata,reqheader)
				.then(function(response){
					console.log(response);
					$('#modal').modal('hide');
					$scope.tempjson.showProject = true;
					$scope.getall_project();
				});
		}else {
			alert("please fill Proper Data");
		}
	};

	// update single project
	$scope.update_project = function () {
		let reqdata = $scope.refJson.PROJECT;
		$http.post('project/update_project',reqdata,reqheader)
			.then(function(response){
				alert("project updated.");
				$scope.getall_project();
			});
	};

	// remove single project
	$scope.remove_project = function () {
		let reqdata = {"_id":$scope.refJson.PROJECT._id};
		$http.post('project/remove_project',reqdata,reqheader)
			.then(function(response){
				alert("project removed.");
				$scope.getall_project();
			});
	};

	// get all user
	$scope.getall_user = function (){
		$http.get('/user/getall_user',reqheader)
		.then(function(res){
			$scope.allUsers = res.data.allItom;
			let cnt = ($scope.allUsers.length >7)?[5,10,50]:[];

			$scope.tableUserParams = new NgTableParams({}, { dataset: $scope.allUsers, counts:cnt});
		}).catch(function(err) {
			console.log(err);
		});
	};
	
	// add single user
	$scope.add_user = function (){
		if($scope.refJson.USER.NAME && $scope.refJson.USER.ROLE && $scope.refJson.USER.EMAIL && $scope.refJson.USER.PASSWORD){
			let reqdata = $scope.refJson.USER;

			$http.post('user/add_user',reqdata,reqheader)
				.then(function(response){
					console.log(response);
					$('#modal2').modal('hide');
					$scope.tempjson.showProject = false;
					$scope.getall_user();
				});
		}else {
			alert("please fill Proper Data");
		}
	};

	//update single user
	$scope.update_user = function () {
		let reqdata = $scope.refJson.USER;

		$http.post('user/update_user',reqdata,reqheader)
			.then(function(response){
				alert("user updated.");
				$scope.getall_user();
			});
	};

	// remove single user
	$scope.remove_user = function () {
		let reqdata = {"_id":$scope.refJson.USER._id};

		$http.post('user/remove_user',reqdata,reqheader)
			.then(function(response){
				alert("user removed.");
				$scope.getall_user();
			});
	};

	// open modal for edit && Update
	$scope.editUpdateModal = function (iobj) {
		if(iobj.ROLE){
			$scope.refJson.USER = iobj;
			$('#modal2').modal('show');
		}else{
			$scope.refJson.PROJECT = iobj;
			$('#modal').modal('show');
		}
	};

	// open modal for edit && Update
	$scope.addModal = function (selector) {
			$scope.refJson.USER = {};
			$scope.refJson.PROJECT = {};
			$(selector).modal('show');
	};

	$scope.checkForLogin = function () {
		return ADD_SERVICE.checkForLogin();
	};
		
	//init function
	$scope.init = function(){
		$scope.getall_project();
		$scope.getall_user();
		$scope.checkForLogin();
		if(ADD_SERVICE.LOGGED_USER){
			$scope.refJson.ROLE = ADD_SERVICE.LOGGED_USER.ROLE
		}
	};
	$scope.init();

	// log Out
	$scope.logOut = function () {
        ADD_SERVICE.logOut();
    };
}]);
