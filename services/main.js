var API_URL = "https://32915b8c.ngrok.io/";
var APP_NAME = "taggApp";

angular.
	module(APP_NAME).
	factory('TagsFactory', ['$resource',
		function ($resource) {
			return $resource(API_URL + "tag/", {}, {
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
	factory('SearchFactory', ['$resource',
		function ($resource) {
			return $resource(API_URL + "search/:on", {}, {
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