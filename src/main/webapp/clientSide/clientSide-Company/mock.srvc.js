(function () {
    var module = angular.module("companyApp");

    module.service("mockServiceHTTP", mockServiceHTTPCtor);
    function Company(compId, compName, compPassword, email) {
        this.compId = compId;
        this.compName = compName;
        this.compPassword = compPassword;
        this.email = email;
    }



    function Customer(custId, custName, custPassword) {
        this.custId = custId;
        this.custName = custName;
        this.custPassword = custPassword;
    }

    function Coupon(coupId, title, startDate, endDate, amount, TYPE, message, price, image) {
        this.coupId = coupId;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.TYPE = TYPE;
        this.message = message;
        this.price = price;
        this.image = image;
    }

    function CompCoup(compId, coupId) {
        this.compId = compId;
        this.coupId = coupId;
    }

    function mockServiceHTTPCtor($q) {
        this.companies = [
            new Company(1, "Cafe Cafe", "111", "cafe@gmail.com"),
            new Company(2, "Greg", "222", "greg@gmail.com"),
            new Company(3, "MEGA SPORT", "333", "mega@gmail.com"),
            new Company(4, "Shufersal", "444", "shufersal@gmail.com"),
            new Company(5, "HABIMA", "555", "habima@gmail.com"),
            new Company(6, "BEIT LESSIN", "666", "lessin@gmail.com")
        ];

        this.customers = [
            new Customer(1, "Noya", "111"),
            new Customer(2, "Lior", "222"),
            new Customer(3, "Hana", "333"),
            new Customer(4, "Gali", "444"),
            new Customer(5, "Mike", "555"),
            new Customer(6, "John", "666"),
            new Customer(7, "Yael", "777"),
            new Customer(8, "Jane", "888"),
        ];

        this.coupons = [
            new Coupon(1, "Cafe Cafe - 20% OFF", new Date(2017, 1, 1), new Date(2017, 6, 1), 20, "RESTAURANTS", "20% OFF discount", 5, "cafe.jpg"),
            new Coupon(2, "Cafe Cafe - 1+1", new Date(2017, 2, 1), new Date(2017, 3, 1), 10, "RESTAURANTS", "Buy 1 get 1 more!", 10, "cafe.jpg"),
            new Coupon(3, "Cafe Cafe - Free Coffee", new Date(2017, 5, 10), new Date(2017, 5, 30), 40, "RESTAURANTS", "Get Free Coffee", 1, "cafe.jpg"),
            new Coupon(4, "Cafe Cafe - Cake", new Date(2017, 5.10), new Date(2017, 5, 30), 40, "RESTAURANTS", "Get a Cake, enjoy!", 8, "cafe.jpg"),
            new Coupon(5, "Greg - 1+1", new Date(2017, 2, 1), new Date(2017, 3, 1), 10, "RESTAURANTS", "Buy 1 get 1 more!", 10, "greg.jpg"),
            new Coupon(6, "Greg - Free Coffee", new Date(2017, 5, 10), new Date(2017, 5, 30), 40, "RESTAURANTS", "Get Free Coffee", 1, "greg.jpg"),
            new Coupon(7, "MEGA SPORT - Shoes", new Date(2017, 5, 10), new Date(2017, 6, 30), 20, "SPORTS", "Discount on Shoes", 200, "mega.jpg"),
            new Coupon(8, "MEGA SPORT - pants", new Date(2017, 3, 5), new Date(2017, 8, 20), 40, "SPORTS", "Discount on Pants", 60, "mega.jpg"),
            new Coupon(9, "Shufersal - Gift Card", new Date(2017, 1, 1), new Date(2018, 1, 1), 100, "FOOD", "Gift Card for 250 NIS", 200, "shufersal.jpg"),
            new Coupon(10, "HABIMA - Free ticket", new Date(2017, 6, 6), new Date(2017, 9, 6), 15, "CULTURE", "Buy 1 ticket, get another one for free!", 70, "habima.jpg"),
            new Coupon(11, "BEIT LESSIN - Free ticket", new Date(2017, 6, 1), new Date(2017, 9, 1), 10, "CULTURE", "Buy 1 ticket, get another one for free!", 70, "lessin.jpg")
        ];
        this.companyCoupons = [
            new CompCoup(1, 1),
            new CompCoup(1, 2),
            new CompCoup(1, 3),
            new CompCoup(1, 4),
            new CompCoup(2, 5),
            new CompCoup(2, 6),
            new CompCoup(3, 7),
            new CompCoup(3, 8),
            new CompCoup(4, 9),
            new CompCoup(5, 10),
            new CompCoup(6, 11)
        ];

        this.createCoupon = function (coupon) {
            var self = this;
            self.coupons.push(coupon);
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.coupons
            });
            return deferred.promise;
        }
        this.createCouponFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupon was NOT created' }
            );
        }
        this.removeCoupon = function (id) {
            var self = this;
            for (var i = 0; i < self.coupons.length; i++) {
                if (self.coupons[i].coupId == id) {
                    self.coupons.splice(i, 1);
                    break;
                }
            }
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.coupons
            });
            return deferred.promise;
        }
        this.removeCouponyFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupon was NOT removed' }
            );
        }

        this.updateCoupon = function (coupon) {
            var self = this;
            for (var i in self.coupons) {
                if (self.coupons[i].coupId == coupon.coupId) {
                    self.coupons[i] = coupon;
                    break;
                }
            }
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.coupons
            });
            return deferred.promise;
        }
        this.updateCouponFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupon was NOT updated' }
            );
        }

        this.getCompany = function (id) {
            var self = this;
            var company = {};
            var deferred = $q.defer();
            for (var i in self.companies) {
                if (self.companies[i].compId == id) {
                    company = self.companies[i];
                    deferred.resolve({
                        status: 200,
                        data: company
                    });
                    break;
                }
            }
            return deferred.promise;
        }
        this.getCompanyFailure = function () {
            return $q.reject(
                { status: 404, data: 'Company was NOT found' }
            );
        }
        this.getCoupon = function (coupId) {
            var self = this;
            var deferred = $q.defer();
            for (var i in self.coupons) {
                if (self.coupons[i].coupId == coupId) {
                    deferred.resolve({
                        status: 200,
                        data: self.coupons[i]
                    });
                    break;
                }
            }
            return deferred.promise;
        }
        this.getCouponFailure = function (coupId) {
            return $q.reject(
                { status: 404, data: 'Coupon was NOT found' }
            );
        }

        this.getCoupons = function () {
            var self = this;
            var compCoupons = [];
            for (var i in self.companyCoupons) {
                if (self.companyCoupons[i].compId == 1) {
                    for (var j in self.coupons) {
                        if (self.companyCoupons[i].coupId == self.coupons[j].coupId) {
                            compCoupons.push(self.coupons[j]);
                        }
                    }
                }
            }
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: compCoupons
            });
            return deferred.promise;
        }
        this.getCouponsFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupons were not found' }
            );
        }
        this.getCompanyCouponsByType = function (t) {
            var self = this;
            var compCoupons = [];
            var deferred = $q.defer();
            for (var i in self.coupons) {
                if (self.coupons[i].TYPE == t) {
                    compCoupons.push(self.coupons[i]);
                }
            }
            deferred.resolve({
                status: 200,
                data: compCoupons
            });
            return deferred.promise;
        }
        this.getCompanyCouponsByTypeFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupons were not found' }
            );
        }

        this.getCompanyCouponsByPrice = function (p) {
            var self = this;
            var compCoupons = [];
            var deferred = $q.defer();
            for (var i in self.coupons) {
                if (self.coupons[i].price <= p) {
                    compCoupons.push(self.coupons[i]);
                }
            }
            deferred.resolve({
                status: 200,
                data: compCoupons
            });
            return deferred.promise;
        }
        this.getCompanyCouponsByPriceFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupons were not found' }
            );
        }

        this.getCompanyCouponsByDate = function (d) {
            var self = this;
            var compCoupons = [];
            var deferred = $q.defer();
            for (var i in self.coupons) {
                        if (self.coupons[i].endDate.getTime() <= d.getTime()) {
                            compCoupons.push(self.coupons[i]);
                        }
                    }
            deferred.resolve({
                status: 200,
                data: compCoupons
            });
            return deferred.promise;
        }
        this.getCompanyCouponsByDateFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupons were not found' }
            );
        }
    }
})();


