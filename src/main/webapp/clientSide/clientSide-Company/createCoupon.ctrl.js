(function() {

	var module = angular.module("companyApp");

	module.controller("CreateCouponCtrl", CreateCouponCtrlCtor);

	// Ctor method for the CreateCouponCtrl
	function CreateCouponCtrlCtor(dataService) {

		this.newCoupon = {};
		this.success = false;
		this.failure = false;
		this.newCoupon = {};
		this.createCoupon = function(form) {
			console.log(this.newCoupon);
			if (this.newCoupon == undefined
					|| this.newCoupon.title == undefined) {
				this.success = false;
				this.failure = true;
				return;
			}
			if (this.newCoupon.price < 0) {
				this.success = false;
				this.failure = true;
				return;
			}
			if (this.newCoupon.startDate < new Date()) {
				this.success = false;
				this.failure = true;
				return;
			}
			if (this.newCoupon.endDate < new Date()
					|| this.newCoupon.endDate < this.newCoupon.startDate) {
				this.success = false;
				this.failure = true;
				return;
			}

			this.success = false;
			this.failure = false;
			var self = this;
			var promisePost = dataService.post('company/createcoupon',
					self.newCoupon);
			promisePost.then(function(resp) {
				// alert(resp.data);
				self.coupons = resp.data;
				self.newCoupon = {};
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
