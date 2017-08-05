(function () {

    var module = angular.module("companyApp");

   module.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

    module.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state("createCoupon", {
            url: "/createCoupon",
            templateUrl: "createCoupon.html",
            controller: "CreateCouponCtrl as cCoup"
        })
        .state("removeCoupon", {
            url: "/removeCoupon",
            templateUrl: "removeCoupon.html",
            controller: "RemoveCouponCtrl as rCoup"
        })
        .state("updateCoupon", {
            url: "/updateCoupon",
            templateUrl: "updateCoupon.html",
            controller: "UpdateCouponCtrl as uCoup"
        })
        .state("getCompany", {
            url: "/getCompany",
            templateUrl: "getCompany.html",
            controller: "GetCompanyCtrl as gComp"
        })
        .state("getCoupon", {
            url: "/getCoupon",
            templateUrl: "getCoupon.html",
            controller: "GetCouponCtrl as gCoup"
        })
        .state("getCoupons", {
            url: "/getCoupons",
            templateUrl: "getCoupons.html",
            controller: "GetCouponsCtrl as gCoups"
        })
        .state("getCompanyCouponsByType", {
            url: "/getCompanyCouponsByType",
            templateUrl: "getCompanyCouponsByType.html",
            controller: "GetCompanyCouponsByTypeCtrl as gccbt"
        })
        .state("getCompanyCouponsByPrice", {
            url: "/getCompanyCouponsByPrice",
            templateUrl: "getCompanyCouponsByPrice.html",
            controller: "GetCompanyCouponsByPriceCtrl as gccbp"
        })
        .state("getCompanyCouponsByDate", {
            url: "/getCompanyCouponsByDate",
            templateUrl: "getCompanyCouponsByDate.html",
            controller: "GetCompanyCouponsByDateCtrl as gccbd"
        })
       
        ;

        $urlRouterProvider.when("", "/createCoupon"); 
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