(function() {

	var module = angular.module("adminApp");

	module.controller("RemoveCompanyCtrl", RemoveCompanyCtrlCtor);

	function RemoveCompanyCtrlCtor(dataService) {

		var self = this;
		self.companies = [];

		var promise = dataService.get('admin/getallcompanies');
		promise.then(function(resp1) {
//			console.log(resp1.data);
			self.companies = resp1.data;
		}, function(err1) {

			// alert(err1.data);
		});

		this.success = false;
		this.failure = false;
		this.deletedCompany = {};
		this.removeCompany = function() {
			console.log(this.deletedCompany.compId);
			if (this.deletedCompany.compId == undefined) {
				this.success = false;
				this.failure = true;
				return;
			}
			this.success = false;
			this.failure = false;
			var self = this;

			var promiseDelete = dataService.remove('admin/removecompany',
					this.deletedCompany.compId);
			promiseDelete.then(function(resp2) {
				// self.companies = resp2.data;
				let
				compIDs= self.companies.map(function(e) {
					return e.compId;
				});
				let index=compIDs.indexOf(+self.deletedCompany.compId);

				self.companies.splice(index, 1);
				self.deletedCompany = {};
				self.success = true;
				self.failure = false;
				
				}, function(err2) {

				// alert(err2.data);
				self.success = false;
				self.failure = true;
			});
		}

	}

})();
