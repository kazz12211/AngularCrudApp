/**
 * 
 */
var app = angular.module("app", []);

app.config(function($locationProvider) {
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});
});

app.factory('$req', function($http, $location) {
	var url = $location.absUrl(); // setting absolute URL
	return {
		getCustomers : function() {
			return $http.get(url + "customers");
		},
		getSales : function() {
			return $http.get(url + "sales");
		},
		addCustomer : function(data) {
			return $http.post(url + "addCustomer", data);
		},
		updateCustomer : function(data) {
			return $http.post(url + "updateCustomer", data);
		},
		deleteCustomer : function(data) {
			return $http.post(url + "deleteCustomer", data);
		},
		updateSale : function(data) {
			return $http.post(url + "updateSale", data);
		}
	}
});
