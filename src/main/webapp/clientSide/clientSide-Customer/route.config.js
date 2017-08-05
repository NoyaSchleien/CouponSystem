(function () {

    var module = angular.module("customerApp");

   module.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

    module.config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state("purchaseCoupon", {
            url: "/purchaseCoupon",
            templateUrl: "purchaseCoupon.html",
            controller: "PurchaseCouponCtrl as pCoup"
        })
        .state("getAllCoupons", {
            url: "/getAllCoupons",
            templateUrl: "getAllCoupons.html",
            controller: "GetAllCouponsCtrl as gaCoups"
        })
        .state("getAllPurchasedCoupons", {
            url: "/getAllPurchasedCoupons",
            templateUrl: "getAllPurchasedCoupons.html",
            controller: "GetAllPurchasedCouponsCtrl as gapCoups"
        })
        .state("getCustomerCouponsByType", {
            url: "/getCustomerCouponsByType",
            templateUrl: "getCustomerCouponsByType.html",
            controller: "GetCustomerCouponsByTypeCtrl as gccbt"
        })
        .state("getCustomerCouponsByPrice", {
            url: "/getCustomerCouponsByPrice",
            templateUrl: "getCustomerCouponsByPrice.html",
            controller: "GetCustomerCouponsByPriceCtrl as gccbp"
        });

        $urlRouterProvider.when("", "/purchaseCoupon"); 
        $urlRouterProvider.when("/couponCarousel", "/getAllCoupons"); 
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