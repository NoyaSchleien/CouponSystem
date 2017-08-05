(function () {
    var module = angular.module("customerApp");

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
    function CustCoup(custId, coupId) {
        this.custId = custId;
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
        this.customerCoupons = [
            new CustCoup(1, 1),
            new CustCoup(1, 5),
            new CustCoup(1, 11),
            new CustCoup(2, 1),
            new CustCoup(2, 2),
            new CustCoup(2, 6),
            new CustCoup(2, 9),
            new CustCoup(3, 3),
            new CustCoup(3, 5),
            new CustCoup(3, 8),
            new CustCoup(3, 10),
            new CustCoup(3, 11),
            new CustCoup(4, 10),
            new CustCoup(5, 4),
            new CustCoup(5, 5),
            new CustCoup(5, 10),
            new CustCoup(6, 8),
            new CustCoup(6, 9),
            new CustCoup(6, 10),
            new CustCoup(7, 1),
            new CustCoup(7, 5),
            new CustCoup(7, 9),
            new CustCoup(8, 1),
            new CustCoup(8, 3),
            new CustCoup(8, 4),
            new CustCoup(8, 6),
            new CustCoup(8, 8),

        ];

        this.purchaseCoupon = function (id) {
            this.customerCoupons.push(1, id);
            var coup = {};
            for (var i = 0; i < this.coupons.length; i++) {
                if (this.coupons[i].coupId == id) {
                    this.coup = this.coupons[i];
                    break;
                }
            }
            var self = this;
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.coup
            });
            return deferred.promise;
        }
        this.purchaseCouponFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupon was NOT purchased' }
            );
        }

        this.getAllCoupons = function () {
            var self = this;
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.coupons
            });
            return deferred.promise;
        }
        this.getAllCouponsFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupons were not found' }
            );
        }

        this.getAllPurchasedCoupons = function () {
            var self = this;
            var custCoupons = [];
            var deferred = $q.defer();
            for (var i in self.customerCoupons) {
                if (self.customerCoupons[i].custId === 1) {
                    var custCoupId = self.customerCoupons[i].coupId;
                    for (var j in self.coupons) {
                        if (custCoupId === self.coupons[j].coupId) {
                            custCoupons.push(self.coupons[j]);
                        }
                    }
                }
            }
            deferred.resolve({
                status: 200,
                data: custCoupons
            });
            return deferred.promise;
        }
        this.getAllPurchasedCouponsFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupons were not found' }
            );
        }
        this.getCustomerCouponsByType = function (t) {
            var self = this;
            var custCoupons = [];
            var deferred = $q.defer();
            for (var i in self.coupons) {
                if (self.coupons[i].TYPE == t) {
                    custCoupons.push(self.coupons[i]);
                }
            }
            deferred.resolve({
                status: 200,
                data: custCoupons
            });
            return deferred.promise;
        }

        this.getCustomerCouponsByTypeFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupons were not found' }
            );
        }

        this.getCustomerCouponsByPrice = function (p) {
            var self = this;
            var custCoupons = [];
            var deferred = $q.defer();
            for (var i in self.coupons) {
                if (self.coupons[i].price <= p) {
                    custCoupons.push(self.coupons[i]);
                }
            }
            deferred.resolve({
                status: 200,
                data: custCoupons
            });
            return deferred.promise;
        }


        this.getCustomerCouponsByPriceFailure = function () {
            return $q.reject(
                { status: 404, data: 'Coupons were not found' }
            );
        }

    }
})();


