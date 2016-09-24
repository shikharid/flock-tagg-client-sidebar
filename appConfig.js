/**
 * Created by shikhar.s on 25/08/16.
 */

'use strict';

angular.module("taggApp").config(['$locationProvider', '$resourceProvider',
    function ($locationProvider, $resourceProvider) {
		$locationProvider.html5Mode({
                  enabled: true
        });
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);

