(function() {

	var module = angular.module("customerApp");

	module.controller("PurchaseCouponCtrl", PurchaseCouponCtrlCtor);
	function PurchaseCouponCtrlCtor(dataService) {

		var coupons = [];
		var custCoupons = [];
		var todayDate = new Date();
		// var todayDate2 = new Date();
		// console.log("todayDate = " + todayDate);
		// console.log("todayDate2 = " + todayDate2);
		// console.log("compering dates = " +((todayDate2) >= (todayDate)));
		// console.log("compering dates = " +((+todayDate2) >= (+todayDate)));

		// console.log ("today's date = " + todayDate)
		var availableCoupons = [];
		var purchasedCoupon = {};
		var hasCoup = false;
		var noCouponsLeft = false;

		var self = this;
		var promiseAll = dataService.get('customer/getallcoupons');
		promiseAll
				.then(
						function(resp1) {

							self.coupons = resp1.data;
							// console.log("coupons = " + self.coupons);
							var promisePurchased = dataService
									.get('customer/getallpurchasedcoupons');
							promisePurchased
									.then(
											function(resp2) {
												self.custCoupons = resp2.data;
												// console.log("custCoupons = "
												// + self.custCoupons);

												for (var i = 0; i < self.coupons.length; i++) {
													// console.log("i = " + i);
													hasCoup = false;
													for (var j = 0; j < self.custCoupons.length; j++) {
														// console.log("j = " +
														// j);
														if (self.coupons[i].couponId == self.custCoupons[j].couponId) {
															hasCoup = true;
															// console.log("here");
															break;
														}
													}
													// console.log("hasCoup = "
													// + self.hasCoup)
													// console.log ("todayDate =
													// "+todayDate);
													// console.log ("endDate =
													// "+self.coupons[i].endDate);
													// console.log("this.hasCoup
													// = "+this.hasCoup) ;
													// console.log("compering
													// dates = "
													// +(self.coupons[i].endDate)
													// >= (todayDate));
													// console.log("compering
													// dates = "
													// +(+self.coupons[i].endDate)
													// >= (+todayDate));
													// console.log("amount =
													// "+self.coupons[i].amount)

													if (!hasCoup
															&& ((new Date(
																	self.coupons[i].endDate)
																	.getTime()) >= todayDate
																	.getTime())
															&& (self.coupons[i].amount > 0)) {
														availableCoupons
																.push(self.coupons[i]);
														// console.log("here!");
													}
												}
												// console.log("self.availableCoupons
												// = " + self.availableCoupons);
												// console.log("this.availableCoupons
												// = " + this.availableCoupons);
												// console.log("availableCoupons
												// = " + availableCoupons);
												if (availableCoupons == "") {
													noCouponsLeft = true;
												}
												// console.log("noCouponsLeft =
												// " + noCouponsLeft);
												// console.log("this.noCouponsLeft
												// ="+this.noCouponsLeft);
												// console.log("availableCoupons
												// = " + availableCoupons);
												// console.log("availableCoupons
												// = " + availableCoupons);

											}, function(err2) {
												// alert(err2.data);
											});
						}, function(err1) {
							// alert(err1.data);
						});

		this.availableCoupons = availableCoupons;
		this.noCouponsLeft = noCouponsLeft;
		this.success = false;
		this.failure = false;

		this.purchaseCoupon = function() {
			// console.log(this.purchasedCoupon);
			if (this.purchasedCoupon == undefined) {
				this.success = false;
				this.failure = true;
				return;
			}
			this.success = false;
			this.failure = false;
			var self = this;

			var promisePost = dataService.post('customer/purchasecoupon/',
					self.purchasedCoupon);
			promisePost
					.then(
							function(resp3) {
								// console.log("inside resp3");
								self.purchasedCoupon = resp3.data;
								// console.log("purchasedCoupon = "
								// + self.purchasedCoupon);

								for (var i = 0; i < self.availableCoupons.length; i++) {
									// console.log("self.purchasedCoupon.couponId
									// "+self.purchasedCoupon.couponId);
									// console.log("self.availableCoupons[i].couponId
									// "+self.availableCoupons[i].couponId);

									if (self.purchasedCoupon.couponId == self.availableCoupons[i].couponId) {
										// console.log("splicing!!!");
										self.availableCoupons.splice(i, 1);
										break;
									}
								}
								// console.log("custCoupons = "
								// + self.custCoupons);
								self.purchasedCoupon = null;
								self.hasCoup = false;
								self.noCouponsLeft = false;
								self.success = true;
								self.failure = false;

							}, function(err3) {
								// alert(err3.data);
								self.success = false;
								self.failure = true;
							});

			this.availableCoupons = availableCoupons;
			this.purchasedCoupon = {};
			this.noCouponsLeft = false;
		}

	}

})();