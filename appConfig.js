/**
 * Created by shikhar.s on 25/08/16.
 */

'use strict';

angular.module("nodalOfficerPortal").config(['API', 'TEMPLATES', 'URLS', '$routeProvider', '$locationProvider', 'RestangularProvider',
    function (API, TEMPLATES, URLS, $routeProvider, $locationProvider, RestangularProvider) {

    }]).run(['$rootScope', 'URLS', function ($rootScope, URLS) {
            $rootScope.urls = URLS;

            $rootScope.cookieLifeTime = 15; // In Minutes
    }]);

