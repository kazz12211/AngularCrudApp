/**
 * 
 */
var myApp = angular
		.module("myModule", [])
		.config(function($routeProvider, $locationProvider) {
		    $locationProvider.html5Mode({enabled: true, requireBase: false});
			$routeProvider
			.when("/home", {
				templateUrl : "home.html",
				controller : "addController"
			})
			.when("/add", {
				templateUrl : "add.html"
			})
			.otherwise({
				redirectTo : "/home"
			});
		})
		.controller(
				"homeController",
				function($scope, $http) {
					$http.get("/customers").then(function(response) {
						$scope.customers = response.data;
					});

					$scope.sortColumn = "name";
					$scope.reverseOrder = false;

					$scope.sortData = function(column) {
						$scope.reverseOrder = ($scope.sortColumn == column) ? !$scope.reverseOrder
								: false;
						$scope.sortColumn = column;
					}

					$scope.sortClass = function(column) {
						if ($scope.sortColumn == column) {
							return $scope.reverseOrder ? 'arrow-down'
									: 'arrow-up';
						}
						return '';
					}
				})
		.controller(
				"addController", 
				function($scope, $http) {
					$scope.addCustomer = function() {
					var customer = {
						name : $scope.name,
						email : $scope.email,
						age : $scope.age
					};
					$http({
						method : 'POST',
						url : '/add',
						data : customer
				}).success(function(data, status, headers, config) {
					console.log("Success");

				}).error(function(data, status, headers, config) {
					console.log("Error");
				});
			}
		});