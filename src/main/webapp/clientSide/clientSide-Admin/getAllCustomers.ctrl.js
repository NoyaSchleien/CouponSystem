(function () {

    var module = angular.module("adminApp");

    module.controller("GetAllCustomersCtrl", GetAllCustomersCtrlCtor);

    function GetAllCustomersCtrlCtor(dataService) {
    	var customers = [];
        var self = this;

        var promise = dataService.get('admin/getallcustomers');
        promise.then(
        function (resp) {
            //alert(resp.data);
            self.customers = resp.data;

        },
        function (err) {
        	
          //  alert(err.data);
        });
    }
})();


