(function () {

    var module = angular.module("adminApp");

    module.controller("UpdateCompanyCtrl", UpdateCompanyCtrlCtor);

    function UpdateCompanyCtrlCtor(dataService) {

        var companies = [];
        var id = {};
        var updatedCompany = {};

        var self = this;
        var promiseGetAll = dataService.get('admin/getallcompanies');
        promiseGetAll.then(
            function (resp1) {
                self.companies = resp1.data;
            },
            function (err1) {
            	
              //  alert(err1.data);
            });

        this.getCompany = function () {
           self.updatedCompany = {};
           this.success = false;
           this.failure = false;
            for (var i in self.companies) {
                if (self.companies[i].compId == self.id) {
                    self.updatedCompany = self.companies[i];
                   break;
                }
            }
        }


            this.success = false;
            this.failure = false;

            this.updateCompany = function (form) {
//                console.log(this.updatedCompany);
                if (this.updatedCompany == undefined || this.updatedCompany.compId == undefined || this.updatedCompany.password == undefined || this.updatedCompany.email == undefined ) {
                    this.success = false;
                    this.failure = true;
                    return;
                }

                this.success = false;
                this.failure = false;

                var self = this;
                var promisePut = dataService.put('admin/updatecompany',this.updatedCompany);
                promisePut.then(
                    function (resp2) {
                        //self.companies = resp2.data;
                        self.updatedCompany = {};
                        self.id = {};
                        self.success = true;
                        self.failure = false;
                        form.$setPristine();

                    },
                    function (err2) {
                     //   alert(err2.data);
                    	
                        self.success = false;
                        self.failure = true;
                    });

            }

        }

    })();


