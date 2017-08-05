(function () {
    var module = angular.module("adminApp");

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
            new Coupon(1, "Cafe Cafe - 20% OFF", 01 / 01 / 2017, 01 / 06 / 2017, 20, "RESTAURANTS", "20% OFF discount", 5, "cafe.jpg"),
            new Coupon(2, "Cafe Cafe - 1+1", 01 / 02 / 2017, 01 / 03 / 2017, 10, "RESTAURANTS", "Buy 1 get 1 more!", 10, "cafe.jpg"),
            new Coupon(3, "Cafe Cafe - Free Coffee", 10 / 05 / 2017, 30 / 05 / 2017, 40, "RESTAURANTS", "Get Free Coffee", 1, "cafe.jpg"),
            new Coupon(4, "Cafe Cafe - Cake", 10 / 05 / 2017, 30 / 05 / 2017, 40, "RESTAURANTS", "Get a Cake, enjoy!", 8, "cafe.jpg"),
            new Coupon(5, "Greg - 1+1", 01 / 02 / 2017, 01 / 03 / 2017, 10, "RESTAURANTS", "Buy 1 get 1 more!", 10, "greg.jpg"),
            new Coupon(6, "Greg - Free Coffee", 10 / 05 / 2017, 30 / 05 / 2017, 40, "RESTAURANTS", "Get Free Coffee", 1, "greg.jpg"),
            new Coupon(7, "MEGA SPORT - Shoes", 10 / 05 / 2017, 30 / 06 / 2017, 20, "SPORTS", "Discount on Shoes", 200, "mega.jpg"),
            new Coupon(8, "MEGA SPORT - pants", 05 / 03 / 2017, 20 / 08 / 2017, 40, "SPORTS", "Discount on Pants", 60, "mega.jpg"),
            new Coupon(9, "Shufersal - Gift Card", 01 / 01 / 2017, 01 / 01 / 2018, 100, "FOOD", "Gift Card for 250 NIS", 200, "shufersal.jpg"),
            new Coupon(10, "HABIMA - Free ticket", 06 / 06 / 2017, 06 / 09 / 2017, 15, "CULTURE", "Buy 1 ticket, get another one for free!", 70, "habima.jpg"),
            new Coupon(11, "BEIT LESSIN - Free ticket", 01 / 06 / 2017, 01 / 09 / 2017, 10, "CULTURE", "Buy 1 ticket, get another one for free!", 70, "lessin.jpg")
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

        this.createCompany = function (company) {
            var self = this;
            self.companies.push(company);
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.companies
            });
            return deferred.promise;
        }
        this.createCompanyFailure = function () {
            return $q.reject(
                { status: 404, data: 'Company was NOT created' }
            );
        }
        this.removeCompany = function (id) {
            var self = this;
            for (var i = 0; i < self.companies.length; i++) {
                if (self.companies[i].compId == id) {
                    self.companies.splice(i, 1);
                    break;
                }
            }
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.companies
            });
            return deferred.promise;
        }
        this.removeCompanyFailure = function () {
            return $q.reject(
                { status: 404, data: 'Company was NOT removed' }
            );
        }

        this.updateCompany = function (company) {
            var self = this;
            for (var i in self.companies) {
                if (self.companies[i].compId == company.compId) {
                    self.companies[i] = company;
                    break;
                }
            }
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.companies
            });
            return deferred.promise;
        }
        this.updateCompanyFailure = function () {
            return $q.reject(
                { status: 404, data: 'Company was NOT updated' }
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

        this.getAllCompanies = function () {
            var self = this;
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.companies
            });
            return deferred.promise;
        }
        this.getAllCompaniesFailure = function () {
            return $q.reject(
                { status: 404, data: 'Companies were not found' }
            );
        }
        this.getCoupons = function (id) {
            var self = this;
            var compCoupons = [];
            for (var i in self.companyCoupons) {
                if (self.companyCoupons[i].compId == id) {
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


        this.createCustomer = function (customer) {
            var self = this;
            self.customers.push(customer);
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.customers
            });
            return deferred.promise;
        }
        this.createCustomerFailure = function () {
            return $q.reject(
                { status: 404, data: 'Customer was NOT created' }
            );
        }
        this.removeCustomer = function (id) {
            var self = this;
            for (var i = 0; i < self.customers.length; i++) {
                if (self.customers[i].custId == id) {
                    self.customers.splice(i, 1);
                    break;
                }
            }
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.customers
            });
            return deferred.promise;
        }
        this.removeCustomerFailure = function () {
            return $q.reject(
                { status: 404, data: 'Customer was NOT removed' }
            );
        }

        this.updateCustomer = function (customer) {
            var self = this;
            for (var i in self.customers) {
                if (self.customers[i].custId === customer.custId) {
                    self.customers[i] = customer;
                    break;
                }
            }
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.customers
            });
            return deferred.promise;
        }
        this.updateCustomerFailure = function () {
            return $q.reject(
                { status: 404, data: 'Customer was NOT updated' }
            );
        }

        this.getCustomer = function (id) {
            var self = this;
            var customer = {};
            var deferred = $q.defer();
            for (var i in self.customers) {
                if (self.customers[i].custId == id) {
                    customer = self.customers[i];
                    deferred.resolve({
                        status: 200,
                        data: customer
                    });
                    break;
                }
            }
            return deferred.promise;
        }
        this.getCustomerFailure = function () {
            return $q.reject(
                { status: 404, data: 'Customer was NOT found' }
            );
        }

        this.getAllCustomers = function () {
            var self = this;
            var deferred = $q.defer();
            deferred.resolve({
                status: 200,
                data: self.customers
            });
            return deferred.promise;
        }
        this.getAllCustomersFailure = function () {
            return $q.reject(
                { status: 404, data: 'Customers were not found' }
            );
        }
    }
})();


