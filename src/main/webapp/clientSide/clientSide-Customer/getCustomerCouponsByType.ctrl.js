(function () {

    var module = angular.module("customerApp");

    module.controller("GetCustomerCouponsByTypeCtrl", GetCustomerCouponsByTypeCtrlCtor);

    function GetCustomerCouponsByTypeCtrlCtor(dataService) {
        var coupons = [];
        var type = {};
        var self = this;
        this.getCustomerCouponsByType = function () {
            var promiseGetCoupons = dataService.get('customer/getcustomercouponsbytype',self.type);
            promiseGetCoupons.then(
                function (resp) {
                    self.coupons = resp.data;
                },
                function (err) {
               //     alert(err.data);
                });
        }

    }
})();


