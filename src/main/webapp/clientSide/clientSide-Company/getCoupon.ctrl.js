(function () {

    var module = angular.module("companyApp");

    module.controller("GetCouponCtrl", GetCouponCtrlCtor);

    function GetCouponCtrlCtor(dataService) {
        var couponAsked = {};
        var id = {};

        var compCoupons = [];
        var self = this;

        var promiseGetCoupons = dataService.get('company/getcoupons');
        promiseGetCoupons.then(
            function (resp1) {
                self.compCoupons = resp1.data;

    },
    function (err1) {
      //  alert(err1.data);
    });



    this.getCoupon = function () {
        console.log(this.couponAsked);

        var self = this;
        var promiseGet = dataService.get('company/getcoupon/'+self.id);
        promiseGet.then(
            function (resp2) {
                self.couponAsked = resp2.data;
            },
            function (err2) {
              //  alert(err2.data);
            });
    }
}
})();


