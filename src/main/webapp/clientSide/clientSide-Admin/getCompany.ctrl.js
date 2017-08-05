(function() {

	var module = angular.module("adminApp");

	module.controller("GetCompanyCtrl", GetCompanyCtrlCtor);

	function GetCompanyCtrlCtor(dataService) {
		 var companies = [];
	        var self = this;
	       var promise = dataService.get('admin/getallcompanies');
	       promise.then(
	       function (resp1) {
	         // alert(resp.data);
	         self.companies = resp1.data;

	       },
	       function (err1) {
	    //   alert(err.data);
	        });
		
		var companyAsked = {};
		var id = {};
		this.getCompany = function() {
			
			var self = this;
			self.companyAsked={}
			if (!self.id)
				return;
		//	console.log(this.companyAsked);

			var promiseGet = dataService.get('admin/getcompany/' + self.id);
			promiseGet.then(function(resp2) {
				self.companyAsked = resp2.data;
			}, function(err2) {
				
				//alert(err.data);
			});
		}
				       	}
})();
