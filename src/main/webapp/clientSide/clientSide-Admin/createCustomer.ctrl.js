(function () {

    var module = angular.module("adminApp");

    module.controller("CreateCustomerCtrl", CreateCustomerCtrlCtor);

    function CreateCustomerCtrlCtor(dataService) {

        this.success = false;
        this.failure = false;
        this.newCustomer = {};
        this.createCustomer = function (form) {
            console.log(this.newCustomer);
            if (this.newCustomer == undefined || this.newCustomer.custName == undefined || this.newCustomer.password == undefined) {
                this.success = false;
                this.failure = true;
                return;
            }
            this.success = false;
            this.failure = false;
            var self = this;
            var promisePost = dataService.post('admin/createcustomer',this.newCustomer);
            promisePost.then(
                function (resp) {
                    //alert(resp.data);
                    self.customers = resp.data;
                    self.newCustomer = {};
                    self.success = true;
                    self.failure = false;
                    form.$setPristine();
    				

                },
                function (err) {
                  //  alert(err.data);
                	
                    self.success = false;
                    self.failure = true;
                });

        }

    }

})();


