(function () {

    var module = angular.module("companyApp");

    module.controller("GetCompanyCouponsByTypeCtrl", GetCompanyCouponsByTypeCtrlCtor);

    function GetCompanyCouponsByTypeCtrlCtor(dataService) {
        var coupons = [];
        var type = {};
        var self = this;
        this.getCompanyCouponsByType = function () {
            var promiseGetCoupons = dataService.get('company/getcompanycouponsbytype',self.type);
            promiseGetCoupons.then(
                function (resp) {
                    self.coupons = resp.data;
                },
                function (err) {
                	//check eror code and redirect if needed...
                   // alert(err.data);
                });
        }

    }
})();


