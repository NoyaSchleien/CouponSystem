(function () {

    var module = angular.module("companyApp");

    module.controller("GetCompanyCouponsByPriceCtrl", GetCompanyCouponsByPriceCtrlCtor);

    function GetCompanyCouponsByPriceCtrlCtor(dataService) {
        var coupons = [];
        var price = {};
        var self = this;
        this.getCompanyCouponsByPrice = function () {
            var promiseGetCoupons = dataService.get('company/getcompanycouponsbyprice',self.price);
            promiseGetCoupons.then(
                function (resp) {
                    self.coupons = resp.data;
                },
                function (err) {
                    //alert(err.data);
                });
        }

    }
})();


