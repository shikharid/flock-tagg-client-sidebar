/**
 * Created by shikhar.s on 26/08/16.
 */
'use strict';

angular.module('taggApp').factory('AuthenticationService', ['Restangular', 'API', '$cookies', '$rootScope',
    function (Restangular, API, cookies, rootScope) {


        var failureCallback = function (response) {
            return {
                success: false,
                data: response
            };
        };

        // Register factory functions
        return {

        }

    }]);
