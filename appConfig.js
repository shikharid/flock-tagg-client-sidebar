/**
 * Created by shikhar.s on 25/08/16.
 */

'use strict';

angular.module("taggApp").config(['$locationProvider', '$resourceProvider', 'RestangularProvider',
    function ($locationProvider, $resourceProvider, RestangularProvider) {
		$locationProvider.html5Mode({
                  enabled: true
        });
        RestangularProvider.setBaseUrl('https://32915b8c.ngrok.io/');
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]);

