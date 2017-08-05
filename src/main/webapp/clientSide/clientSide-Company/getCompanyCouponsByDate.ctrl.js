(function () {

    var module = angular.module("companyApp");

    module.controller("GetCompanyCouponsByDateCtrl", GetCompanyCouponsByDateCtrlCtor);

    function GetCompanyCouponsByDateCtrlCtor(dataService) {
        var coupons = [];
        var date = new Date();
        var self = this;
        this.getCompanyCouponsByDate = function () {
            var promiseGetCoupons = dataService.get('company/getcompanycouponsbydate',+self.date);
            promiseGetCoupons.then(
                function (resp) {
                    self.coupons = resp.data;
                },
                function (err) {
                   // alert(err.data);
                });
        }

    }
})();


