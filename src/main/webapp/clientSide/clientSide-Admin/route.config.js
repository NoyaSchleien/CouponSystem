(function () {

    var module = angular.module("adminApp");

   module.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

    module.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state("createCompany", {
            url: "/createCompany",
            templateUrl: "createCompany.html",
            controller: "CreateCompanyCtrl as cComp"
        })
        .state("removeCompany", {
            url: "/removeCompany",
            templateUrl: "removeCompany.html",
            controller: "RemoveCompanyCtrl as rComp"
        })
        .state("updateCompany", {
            url: "/updateCompany",
            templateUrl: "updateCompany.html",
            controller: "UpdateCompanyCtrl as uComp"
        })
        .state("getCompany", {
            url: "/getCompany",
            templateUrl: "getCompany.html",
            controller: "GetCompanyCtrl as gComp"
        })
        .state("getAllCompanies", {
            url: "/getAllCompanies",
            templateUrl: "getAllCompanies.html",
            controller: "GetAllCompaniesCtrl as gaComp"
        })
        .state("getCoupons", {
            url: "/getCoupons",
            templateUrl: "getCoupons.html",
            controller: "GetCouponsCtrl as gCoups"
        })
        .state("createCustomer", {
            url: "/createCustomer",
            templateUrl: "createCustomer.html",
            controller: "CreateCustomerCtrl as cCust"
        })
        .state("removeCustomer", {
            url: "/removeCustomer",
            templateUrl: "removeCustomer.html",
            controller: "RemoveCustomerCtrl as rCust"
        })
        .state("updateCustomer", {
            url: "/updateCustomer",
            templateUrl: "updateCustomer.html",
            controller: "UpdateCustomerCtrl as uCust"
        })
        .state("getCustomer", {
            url: "/getCustomer",
            templateUrl: "getCustomer.html",
            controller: "GetCustomerCtrl as gCust"
        })
        .state("getAllCustomers", {
            url: "/getAllCustomers",
            templateUrl: "getAllCustomers.html",
            controller: "GetAllCustomersCtrl as gaCust"
        })
       ;

        $urlRouterProvider.when("", "/createCompany"); 
        $urlRouterProvider.otherwise(function($injector, $location){
         
            $injector.invoke(function($window, $timeout) { 
              $timeout(function() {
                $window.location.href="http://localhost:8080/Webapp/clientSide/404.html";
              });
            });
            return true;
        });
    });

})();