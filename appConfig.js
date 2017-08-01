/**
 * Created by shikhar.s on 25/08/16.
 */
'use strict';
angular.module('taggApp', [
    'ngCookies',
    'restangular',
    'ngRoute',
    'smart-table',
    'autocomplete',
    'ui.select',
    'ngSanitize',
    'ngResource',
    'angular-loading-bar'
]);

angular.module('taggApp').config(['$locationProvider', '$resourceProvider', 'RestangularProvider',
    function ($locationProvider, $resourceProvider, RestangularProvider) {
		$locationProvider.html5Mode({
                  enabled: true
        });

        RestangularProvider.setBaseUrl('https://75597844.ngrok.io/');
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }]).run(['$rootScope', function (root) {

        root.API_URL = 'https://75597844.ngrok.io/';
}]);

var APP_NAME = "taggApp";

angular.
	module(APP_NAME).
	factory('TagsFactory', ['$resource', '$rootScope',
		function ($resource, $rootScope) {

			return $resource($rootScope.API_URL + "tag/", {}, {
				get: {
					method: 'GET',
					isArray: true
				},
				save: {
					method: 'POST'
				}
			});
		}
	]);


angular.
	module(APP_NAME).
	factory('SearchFactory', ['$resource', '$rootScope',
		function ($resource, $rootScope) {

			return $resource($rootScope.API_URL + "search/:on", {}, {
				getMessages: {
					method: 'POST',
					params: {
						on: 'message'
					}
				},
				getFiles: {
					method: 'POST',
					params: {
						on: 'file'
					}
				}
			});
		}
	]);


angular.module('taggApp').filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function(item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});
angular.
module('taggApp').
component('sidebar', {
    templateUrl: 'templates/sidebar.html',
    controller: ['$location','$scope', '$http', 'TagsFactory', '$rootScope', function($location,$scope,$http, TagsFactory, $rootScope){
        var self = this;
        var queryParams = $location.search();
        var API_URL = $rootScope.API_URL;
        var flockEvent = JSON.parse(queryParams.flockEvent);
        console.log(flockEvent);
        self.selectedtags = [];
        self.userId = flockEvent.userId || 'u:v77sdynhzi74zy44';



        self.allTags = [];
        TagsFactory.get({'userId': self.userId}, function(data) {
            self.allTags = data;
            console.log("data sidebar");
            console.log(data);
        });





        $scope.fillFiles = function() {

            var tags = self.selectedtags.map(function(val) { return val.id});
            var params = {
                userId: self.userId,
                tags: tags
            };

            $http.post(API_URL + "search/file/", params , {async:true}).success(function(data){

                $scope.files = data;
                for(var i in $scope.files){
                    $scope.files[i].fileName = $scope.files[i].file_data.substring($scope.files[i].file_data.lastIndexOf('/')+1).substring(0, 17);
                }
            });

            //console.log($scope.skills);
        };

        $scope.fillFiles();
        $scope.$watch('userId', function() {$scope.fillFiles() });
        $scope.fillMessages = function() {
            var tags = self.selectedtags.map(function(val) { return val.id});
            var params = {
                userId: self.userId,
                tags: tags
            };

            $http.post(API_URL + "search/message/", params,{async:true}).success(function(message){

                $scope.messages = message;
            });


        };
        $scope.fillMessages();
        $scope.$watch('userId', function() { $scope.fillMessages() });

        $scope.openUrl = function (url) {
            console.log(API_URL + url.substring(1));
            flock.openBrowser(API_URL + url.substring(1));
        }

    }]
});



