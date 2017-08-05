(function () {

    var module = angular.module("adminApp");

    module.controller("GetAllCompaniesCtrl", GetAllCompaniesCtrlCtor);

    function GetAllCompaniesCtrlCtor(dataService) {
        var companies = [];
        var self = this;
       var promise = dataService.get('admin/getallcompanies');
       promise.then(
       function (resp) {
         // alert(resp.data);
         self.companies = resp.data;

       },
       function (err) {
    //   alert(err.data);
        });
    }
})();


