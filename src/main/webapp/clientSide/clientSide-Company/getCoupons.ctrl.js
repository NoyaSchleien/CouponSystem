
(function () {

    var module = angular.module("companyApp");

    module.controller("GetCouponsCtrl", GetCouponsCtrlCtor);

    function GetCouponsCtrlCtor(dataService) {
            var compCoupons = [];
       var self = this;

            var promiseGetCoupons = dataService.get('company/getcoupons');
            promiseGetCoupons.then(
                function (resp) {
                    self.compCoupons = resp.data;

                },
                function (err) {
              //      alert(err.data);
                });
        }
    
})();


