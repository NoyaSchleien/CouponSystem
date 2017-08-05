(function () {

    var module = angular.module("adminApp");

    module.controller("UpdateCustomerCtrl", UpdateCustomerCtrlCtor);

    function UpdateCustomerCtrlCtor(dataService) {

        var self = this;
        self.customers = [];
        var id = {};
        this.updatedCustomer = {};

        var promiseGetAll = dataService.get('admin/getallcustomers');
        promiseGetAll.then(
            function (resp1) {
                self.customers = resp1.data;
            },
            function (err1) {
            	
               // alert(err1.data);
            });

        this.getCustomer = function () {
           self.updatedCustomer = {};
           this.success = false;
           this.failure = false;
           
            for (var i in self.customers) {
                if (self.customers[i].custId == self.id) {
                    self.updatedCustomer = self.customers[i];
                   break;
                 
                }
            }
        }


            this.success = false;
            this.failure = false;

            this.updateCustomer = function () {
                console.log(this.updatedCustomer);
                if (this.updatedCustomer == undefined || this.updatedCustomer.custId == undefined || this.updatedCustomer.password == undefined) {
                    this.success = false;
                    this.failure = true;
                    return;
                }

                this.success = false;
                this.failure = false;

                var self = this;
                var promisePut = dataService.put('admin/updatecustomer',this.updatedCustomer);
                promisePut.then(
                    function (resp2) {
                       // self.customers = resp2.data;
                        self.updatedCustomer = {};
                        self.id = {};
                        self.success = true;
                        self.failure = false;

                    },
                    function (err2) {
                   //     alert(err2.data);
                    	
                        self.success = false;
                        self.failure = true;
                    });

            }

        }

    })();


