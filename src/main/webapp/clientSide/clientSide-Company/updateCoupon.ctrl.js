(function() {

	var module = angular.module("companyApp");

	module.controller("UpdateCouponCtrl", UpdateCouponCtrlCtor);

	function UpdateCouponCtrlCtor(dataService) {

		var coupons = [];
		var id = {};
		var updatedCoupon = {};
		var date = new Date();
		var price = {};
		var flagPrice = false;
		var flagDate = false;
		var self = this;
		$("#datepicker").datepicker();
		var promiseGetAll = dataService.get('company/getcoupons');
		promiseGetAll.then(function(resp1) {
			self.coupons = resp1.data;
		}, function(err1) {
			// alert(err1.data);
		});

		this.getCoupon = function() {
			self.updatedCoupon = {};
			for ( var i in self.coupons) {
				if (self.coupons[i].couponId == self.id) {
					self.updatedCoupon = self.coupons[i];
					$("#datepicker").datepicker('setDate',
							self.updatedCoupon.endDate);
					
					this.success = false;
					this.failure = false;
					break;

				}
			}
		}

		this.success = false;
		this.failure = false;

		this.updateCoupon = function(form) {
			 this['date']=$("#datepicker").datepicker('getDate');
			console.log(this.updatedCoupon);
			if (this.updatedCoupon == undefined
					|| this.updatedCoupon.couponId == undefined) {
				this.success = false;
				this.failure = true;
				return;
			}

			if (this['date'] < this.updatedCoupon['starDate']
					|| this['date'] < new Date()) {
				this.flagDate = true;
				this.success = false;
				this.failure = true;
				return;
			}

			if (this.price < 0) {
				this.flagPrice = true;
				this.success = false;
				this.failure = true;
				return;
			}

			this.success = false;
			this.failure = false;
			if (!this.flagPrice && !this.flagDate) {
//				this.updatedCoupon.price = this.price;
				this.updatedCoupon['endDate'] = this['date'];
				var self = this;
				var promisePut = dataService.put('company/updatecoupon',
						self.updatedCoupon);
				promisePut.then(function(resp3) {
					// self.coupons = resp3.data;
					self.updatedCoupon = {};
					self.id = {};
					self.success = true;
					self.failure = false;
					form.$setPristine();
					$("#datepicker").datepicker('setDate',
							'');
					
				}, function(err3) {
					// alert(err3.data);
					self.success = false;
					self.failure = true;
				});

			}
		}
	}

})();
