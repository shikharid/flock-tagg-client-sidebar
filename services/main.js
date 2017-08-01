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