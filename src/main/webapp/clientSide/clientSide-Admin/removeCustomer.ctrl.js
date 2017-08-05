(function() {

	var module = angular.module("adminApp");

	module.controller("RemoveCustomerCtrl", RemoveCustomerCtrlCtor);

	function RemoveCustomerCtrlCtor(dataService) {

		var self = this;
		self.customers = [];

		var promise = dataService.get('admin/getallcustomers');
		promise.then(function(resp1) {
			self.customers = resp1.data;
		}, function(err1) {

			// alert(err1.data);
		});

		this.success = false;
		this.failure = false;
		this.deletedCustomer = {};
		this.removeCustomer = function() {
			console.log(this.deletedCustomer.custId);
			if (this.deletedCustomer.custId == undefined) {
				this.success = false;
				this.failure = true;
				return;
			}
			this.success = false;
			this.failure = false;
			var self = this;

			var promiseDelete = dataService.remove('admin/removecustomer',
					this.deletedCustomer.custId);
			promiseDelete.then(function(resp2) {
				let
				custIDs= self.customers.map(function(e) {
					return e.custId;
				});
				let index=custIDs.indexOf(+self.deletedCustomer.custId);

				self.customers.splice(index, 1);
				
				//self.customers = resp2.data;
				self.deletedCustomer = {};
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
