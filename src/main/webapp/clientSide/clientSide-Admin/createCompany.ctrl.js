(function() {

	var module = angular.module("adminApp");

	module.controller("CreateCompanyCtrl", CreateCompanyCtrlCtor);

	function CreateCompanyCtrlCtor(dataService) {
		this.success = false;
		this.failure = false;
		this.newCompany = {};
		this.createCompany = function(form) {
		//	console.log(this.newCompany);
			if (this.newCompany == undefined
					|| this.newCompany.compName == undefined
					|| this.newCompany.password == undefined
					|| this.newCompany.email == undefined) {
				this.success = false;
				this.failure = true;
				return;
			}
			this.success = false;
			this.failure = false;
			var self = this;
			var promisePost = dataService.post('admin/createcompany',
					this.newCompany);
			promisePost.then(function(resp) {
				// alert(resp.data);
				// self.companies = resp.data;
				self.newCompany = {};
				self.success = true;
				self.failure = false;
				form.$setPristine();
				

			}, function(err) {
				// alert(err.data);

				self.success = false;
				self.failure = true;

			});
		}

	}

})();
