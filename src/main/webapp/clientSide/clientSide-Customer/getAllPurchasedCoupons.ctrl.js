(function () {

    var module = angular.module("customerApp");

    module.controller("GetAllPurchasedCouponsCtrl", GetAllPurchasedCouponsCtrlCtor);

    function GetAllPurchasedCouponsCtrlCtor(dataService) {
        var custCoupons = [];
        var self = this;

        var promiseGetCoupons = dataService.get('customer/getallpurchasedcoupons');
        promiseGetCoupons.then(
            function (resp) {
                self.custCoupons = resp.data;

            },
            function (err) {
              //  alert(err.data);
            });
    }

})();


