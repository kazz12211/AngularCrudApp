/**
 * 
 */
app.controller("homeController", function($scope, $req, $timeout, $filter, $window, $q) {
	$scope.ui = ts.ui;

	$scope.ui.ready(function() {
		$scope.topbar = ts.ui.get("#home-topbar");
		$scope.customerTable = ts.ui.get("#customer-table");
		$scope.salesTable = ts.ui.get("#sales-table");
		$scope.salesAside = ts.ui.get("#sales-aside");
		$scope.showTab = 0;
		$scope.popup = ts.ui.Notification;
		$scope.selectedCustomer = null;
		$scope.selectedRow = -1;
		$scope.editMode = 0;
		$scope.selectedSale = null;

		
		$scope.topbar.tabs([ {
			label : "Customers",
			id : "tab0",
			onselect : function() {
				$scope.selectedCustomer = null;
				$scope.selectedRow = -1;
				$scope.showTab = 0;
				$scope.$apply();
				scrollTo(0, 0);
			}
		}, {
			label : "Sales",
			id : "tab1",
			onselect : function() {
				$scope.selectedSale = null;
				$scope.selectedRow = -1;
				$scope.showTab = 1;
				$scope.$apply();
				scrollTo(0, 0);
			}
		} ]);

		$scope.customerTable.cols([ {
			label : "Name"
		}, {
			label : "Email",
			flex : 2
		}, {
			label : "Age",
			type : "ts-number"
		} ]).sortable(function(index, ascending) {
			$scope.customerTable.sort(index, ascending);
		}).max(5).sort(0, false).clickable(function(rowindex, cellindex) {
			$scope.selectedCustomer = $scope.customers[rowindex];
			$scope.selectedRow = rowindex;
			$scope.editMode = 0;
			$scope.$apply();
		});

		$scope.salesTable.cols([ {
			label : "Sale Date"
		}, {
			label : "Customer", search: {tip: "Search customer names", onidle: function(value) {
				$scope.salesTable.search(1, value);
			}}
		}, {
			label : "Product Name",
			flex : 2, search: { tip: "Search product names", onidle: function(value) {
				$scope.salesTable.search(2, value);
			}}
		}, {
			label : "Price",
			type : "ts-number"
		}, {
			label : "Quantity",
			type : "ts-number"
		}, {
			label : "Amount",
			type : "ts-number"
		} ]).sortable(function(index, ascending) {
			$scope.salesTable.sort(index, ascending);
		}).max(10).sort(0, false)
		.clickable(function(rowindex, cellindex) {
			$scope.selectedSale = $scope.sales[rowindex];
			$scope.selectedRow = rowindex;
			$scope.salesAside.title("Edit Sale");
			$scope.salesAside.open();
			$scope.$apply();
		});

		$q.all([ $req.getCustomers(), $req.getSales() ]).then(
				function(response) {
					$scope.customers = response[0].data;
					$scope.sales = response[1].data;

					for(var i = 0; i < $scope.sales.length; i++) {
						$scope.sales[i].saleDate = new Date($scope.sales[i].saleDate);
					}

					populateCustomerTable($scope.customers);
					populateSalesTable($scope.sales);
				});

		$scope.newMode = function() {
			$scope.editMode = 1;
			$scope.newCustomer = {
				name : "",
				email : "",
				age : 0
			};
		};

		$scope.updateCustomer = function() {
			$q.all(
				[ 
					$req.updateCustomer($scope.selectedCustomer)
				])
				.then(function(response) {
					$scope.customers[$scope.selectedRow] = response[0].data;
					populateCustomerTable($scope.customers);
			});
		};

		$scope.addCustomer = function() {
			$q.all(
				[ 
				 	$req.addCustomer($scope.newCustomer),
				])
				.then(function(response) {
					console.log(response[0].data);
					$scope.customers.push(response[0].data);
					populateCustomerTable($scope.customers);
				});
		};

		$scope.deleteCustomer = function() {
			$q.all(
				[
				 	$req.deleteCustomer($scope.selectedCustomer)
				]).then(function(response) {
					console.log(response[0].data);
					$scope.customers.splice($scope.selectedRow, 1);
					populateCustomerTable($scope.customers);
				});
		};
		
		$scope.updateSale = function() {
			$q.all([
			        $req.updateSale($scope.selectedSale)
			])
			.then(function(response) {
				console.log(response[0].data);
				$scope.sales[$scope.selectedRow] = response[0].data;
				populateSalesTable($scope.sales);
				$scope.salesAside.close();
			});
		};
		
		function populateCustomerTable(customers) {
			var rows = [];
			for (var i = 0; i < customers.length; i++) {
				var customer = customers[i];
				rows.push([ customer.name, customer.email, customer.age ]);
			}
			$scope.customerTable.rows(rows);
		}

		function populateSalesTable(sales) {
			var rows = [];
			for (var i = 0; i < sales.length; i++) {
				var sale = sales[i];
				rows.push([ $filter('date')(sale.saleDate, "yyyy/MM/dd"), sale.customer.name,
						sale.productName, sale.price, sale.quantity,
						sale.quantity * sale.price ]);
			}
			$scope.salesTable.rows(rows);
		}
				
	});
});
