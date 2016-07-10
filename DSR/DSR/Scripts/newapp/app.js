'use strict';


// Declare app level module which depends on filters, and services
//var myApp=angular.module('myApp', [
//  'ngRoute',
//  'ngResource',
//  'myApp.filters',
//  'myApp.services',
//  'myApp.directives',
//  'myApp.controllers',
//  'ngLoadScript',
//  'ngCookies'
//]).
var myApp = angular.module('myApp', [
    'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
]).
config(['$routeProvider', function ($routeProvider) {
   
    $routeProvider.when('/browseDsr/:dsrId', {
        templateUrl: '/partial1.html', controller: 'dsrController'
    })
    .when('/', {
        templateUrl: '/dsrprojects.html', controller: 'dsrProjectController'
    })
    .when('/projectdsrs/:projectId', {
        templateUrl: '/projectdsrs.html', controller: 'projectDsrsController'
    })
    .when('/sendnewdsr/:projectId', {
        templateUrl: '/newdsr.html', controller: 'newDsrsController'
    });
    //$locationProvider.html5Mode(true);
}]);













//    $routeProvider.when('/view1', {
//        resolve: {
//            "check": function ($location, $rootScope, $cookies) {
//                // console.log(" myApp email : " + $cookies.get('userEmail').length);
//                if (!angular.isDefined($cookies.get('userEmail'))) {
//                    $location.path('/');
//                }
//            }
//        },
//        templateUrl: '/partialsnew/partial1.html', controller: 'momController'
//    });
//    $routeProvider.when('/view2', {
//        resolve: {
//            "check": function ($location, $rootScope, $cookies) {
//                if (!angular.isDefined($cookies.get('userEmail'))) {
//                    $location.path('/');
//                }
//            }
//        },
//        templateUrl: 'partialsnew/partial2.html', controller: 'momController'
//    });
//    $routeProvider.when('/view3/:momId', {
//        resolve: {
//            "check": function ($location, $rootScope, $cookies) {
//                console.log($rootScope.loggedIn);
//                if (!angular.isDefined($cookies.get('userEmail'))) {
//                    $location.path('/');
//                }
//            }
//        },
//        templateUrl: 'partialsnew/partial3.html', controller: 'momController2'
//    });
//    $routeProvider.when('/', { templateUrl: '/partialsnew/login.html', controller: 'loginController' });
//    $routeProvider.otherwise({ redirectTo: '/' });
//} ]);
