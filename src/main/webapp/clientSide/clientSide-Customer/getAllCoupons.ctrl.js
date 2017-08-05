(function () {

    var module = angular.module("customerApp");

    module.controller("GetAllCouponsCtrl", GetAllCouponsCtrlCtor);

    function GetAllCouponsCtrlCtor(dataService) {
        var coupons = [];
        var self = this;
        var promise = dataService.get('customer/getallcoupons');
        promise.then(
            function (resp) {
            	//console.log("data in controller = " + resp.data);
                self.coupons = resp.data;
            },
            function (err) {
            //    alert(err.data);
            });
    }
})();