(function () {

    var module = angular.module("companyApp");

    module.controller("RemoveCouponCtrl", RemoveCouponCtrlCtor);

    function RemoveCouponCtrlCtor(dataService) {

        var coupons = [];
        var self = this;

        var promise = dataService.get('company/getcoupons');
        promise.then(
            function (resp1) {
            	 this.success = false;
                 this.failure = false;
                self.coupons = resp1.data;
            },
            function (err1) {
            //    alert(err1.data);
            });

        this.success = false;
        this.failure = false;
        var deletedCoupon = {};
        this.removeCoupon = function () {
         //   console.log(this.deletedCoupon.couponId);
            if (this.deletedCoupon.couponId == undefined) {
                this.success = false;
                this.failure = true;
                return;
            }
            this.success = false;
            this.failure = false;
            var self = this;
          
            var promiseDelete = dataService.remove('company/removecoupon', self.deletedCoupon.couponId);
            promiseDelete.then(
                function (resp2) {
                    //self.coupons = resp2.data;
                	let
    				couponIDs= self.coupons.map(function(e) {
    					return e.couponId;
    				});
    				let index=couponIDs.indexOf(+self.deletedCoupon.couponId);

    				self.coupons.splice(index, 1);
    				
                    self.deletedCoupon = {};
                    self.success = true;
                    self.failure = false;

                },
                function (err2) {
                //    alert(err2.data);
                    self.success = false;
                    self.failure = true;
                });
           }
        

    }

})();


