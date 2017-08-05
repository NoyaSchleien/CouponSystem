(function () {

    var module = angular.module("adminApp");

    module.controller("GetCouponsCtrl", GetCouponsCtrlCtor);

    function GetCouponsCtrlCtor(dataService) {
        var id = {};
        var companies = [];
        var self = this;

        var promiseGetCompanies = dataService.get('admin/getallcompanies');
        promiseGetCompanies.then(
            function (resp1) {
                self.companies = resp1.data;
            },
            function (err1) {
            	
             //   alert(err1.data);
            });

        this.getCoupons = function () {

        self.compCoupons = [];
            var promiseGetCoupons = dataService.get('admin/getcoupons/'+self.id);
            promiseGetCoupons.then(
                function (resp2) {
                    self.compCoupons = resp2.data;

                },
                function (err2) {
                	
                 //   alert(err2.data);
                });
        }
    }
})();


