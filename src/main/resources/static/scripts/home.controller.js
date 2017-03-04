/**
 * 
 */
app.controller("homeController", function($scope, $req, $window, $q) {
	$scope.ui = ts.ui;
    
    $scope.ui.ready(function() {
        $scope.topbar = ts.ui.get("#home-topbar");
        $scope.customerTable = ts.ui.get("#customer-table");
        $scope.salesTable = ts.ui.get("#sales-table");
        $scope.showTab = 0;
        $scope.popup = ts.ui.Notification;
        $scope.selectedCustomer = null;
        $scope.editMode = 0;
        
        $scope.topbar
    	.tabs([
    	       {
    	    	   label: "Customers",
    	    	   id: "tab0",
    	    	   onselect: function() {
    	    		   $scope.selectedCustomer = null;
    	    		   $scope.showTab = 0;
    	    		   $scope.$apply();
    	    		   scrollTo(0, 0);
    	    	   }
    	       },
    	       {
    	    	   label: "Sales",
    	    	   id: "tab1",
    	    	   onselect: function() {
    	    		   $scope.showTab = 1;
    	    		   $scope.$apply();
    	    		   scrollTo(0, 0);
    	    	   }
    	       }
    	       ]);
        
        $scope.customerTable
    	.cols([
    	       {label: "Name"}, 
    	       {label: "Email", flex:2}, 
    	       {label: "Age", type:"ts-number"}
    	])
    	.sortable(function(index, ascending) {
    		$scope.customerTable.sort(index, ascending);
    	})
    	.max(5)
    	.sort(0, false)
    	.clickable(function(rowindex, cellindex) {
    		$scope.selectedCustomer = $scope.customers[rowindex];
    		$scope.editMode = 0;
 		    $scope.$apply();
    	});
    	
    	$scope.salesTable
    	.cols([
    	       {label: "Date"},
    	       {label: "Customer"},
    	       {label: "Product Name", flex:2},
    	       {label: "Price", type: "ts-number"},
    	       {label: "Quantity", type: "ts-number"},
    	       {label: "Amount", type: "ts-number"}
    	 ])
    	.sortable(function(index, ascending) {
    		$scope.salesTable.sort(index, ascending);
    	})
    	.max(5)
    	.sort(0, false);

        $q.all([
            $req.getCustomers(),
            $req.getSales()
        ]).then(function(response) {
	    	$scope.customers = response[0].data;
	    	$scope.sales = response[1].data;
	    	
	    	populateCustomerTable($scope.customers);
	    	populateSalesTable($scope.sales);
        });
        
        $scope.newMode = function() {
        	$scope.editMode = 1;
        	$scope.newCustomer = {name:"", email:"", age:0};
        };


        $scope.updateCustomer = function() {
        	$q.all([
             	    $req.updateCustomer($scope.selectedCustomer),
             	    $req.getCustomers()
             	])
             	.then(function(response) {
             		console.log(response[0].data);
         			$scope.customers = response[1].data;
         			populateCustomerTable($scope.customers);
         			$scope.$apply();
             	});
        };
        
        $scope.addCustomer = function() {
        	$q.all([
        	    $req.addCustomer($scope.newCustomer),
        	    $req.getCustomers()
        	])
        	.then(function(response) {
        		console.log(response[0].data);
    			$scope.customers = response[1].data;
    			populateCustomerTable($scope.customers);
     			$scope.$apply();
       	});
        };
        
        function populateCustomerTable(customers) {
	    	var rows = [];
	    	for(var i = 0; i < customers.length; i++) {
	    		var customer = customers[i];
	    		rows.push([customer.name, customer.email, customer.age]);
	    	}
	    	$scope.customerTable.rows(rows);
        }
        
        function populateSalesTable(sales) {
	    	var rows = [];
	    	for(var i = 0; i < sales.length; i++) {
	    		var sale = sales[i];
	    		rows.push([new Date(sale.saleDate), sale.customer.name, sale.productName, sale.price, sale.quantity, sale.quantity * sale.price]);
	    	}
	    	$scope.salesTable.rows(rows);
        }
    });
});
    