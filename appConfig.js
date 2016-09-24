/**
 * Created by shikhar.s on 25/08/16.
 */

'use strict';

angular.module("taggApp").config(['$locationProvider',
    function ($locationProvider) {
		$locationProvider.html5Mode({
                  enabled: true
        });
    }]);

