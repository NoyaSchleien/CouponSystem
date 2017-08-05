(function () {

    var module = angular.module("companyApp");

    module.controller("GetCompanyCtrl", GetCompanyCtrlCtor);

    function GetCompanyCtrlCtor(dataService) {
        var companyAsked = {};
        
           // console.log(this.companyAsked);
            
            var self = this;
            var promiseGet = dataService.get('company/getcompany');
            promiseGet.then(
                function (resp) {
                    self.companyAsked = resp.data;
                  //  console.log("self.companyAsked = " + self.companyAsked);
                 //   console.log("response = " + resp);
                    
                },
                function (err) {
              //      alert(err.data);
                });
    }
    module.directive("personalMsgDirective", function() {
    	return {
    		restrict : "A",
    		template : "<h1>{{gComp.companyAsked.compName}},</h1><br/><h2>Thank you for using our Coupon System!</h2>"
    	};
    });    
    
})();


