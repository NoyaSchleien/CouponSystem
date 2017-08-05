(function () {

    var module = angular.module("customerApp");

    module.controller("GetCustomerCouponsByPriceCtrl", GetCustomerCouponsByPriceCtrlCtor);

    function GetCustomerCouponsByPriceCtrlCtor(dataService) {
        var coupons = [];
        var price = {};
        var self = this;
        this.getCustomerCouponsByPrice = function () {
            var promiseGetCoupons = dataService.get('customer/getcustomercouponsbyprice/'+self.price);
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


