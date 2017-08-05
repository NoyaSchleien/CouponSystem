(function () {

    var module = angular.module("adminApp");

    module.controller("GetCustomerCtrl", GetCustomerCtrlCtor);

    function GetCustomerCtrlCtor(dataService) {
    	var customers = [];
        var self = this;
       var promise = dataService.get('admin/getallcustomers');
       promise.then(
       function (resp1) {
         // alert(resp.data);
         self.customers = resp1.data;

       },
       function (err1) {
    //   alert(err.data);
        });
       
        var customerAsked = {};
        var id = {};
        this.getCustomer = function () {
           // console.log(this.customerAsked);
            
            var self = this;
			self.customerAsked={}
			if (!self.id)
				return;
            var promiseGet = dataService.get('admin/getcustomer/'+self.id);
            promiseGet.then(
                function (resp2) {
                    self.customerAsked = resp2.data;
                },
                function (err2) {
                	
                   // alert(err.data);
                });
        }
    }
})();


