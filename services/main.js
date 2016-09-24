var API_URL = "http://172.16.153.248:8000/";
var APP_NAME = "taggApp";

angular.
	module(APP_NAME).
	factory('FileFactory', ['$resource',
		function ($resource) {
			return $resource(API_URL + "file/:fileId", {}, {
				save: {
					method: 'POST'
				},
				get: {
					method: 'GET',
					isArray: false
				}

			});
		}

	]);

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
	factory('MessageFactory', ['$resource',
		function ($resource) {
			return $resource(API_URL + "message/:messageId", {}, {
				get: {
					method: 'GET',
					isArray: false
				},
				save: {
					method: 'POST'
				}
			});
		}
	]);


angular.
	module(APP_NAME).
	factory('ContentFactory', ['$resource',
		function ($resource) {
			return $resource(API_URL + "content/:contentId", {}, {
				get: {
					method: 'GET',
					isArray: false
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
				},
			});
		}
	]);