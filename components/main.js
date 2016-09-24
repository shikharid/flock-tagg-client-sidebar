/**
 * Created by harsh.l on 24/09/16.
 */
'use strict';
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
angular.module('taggApp').directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
};
}]);
angular.
	module('taggApp').
	component('home', {
		templateUrl: 'templates/base.html',
		controller: ['$location', '$scope', 'TagsFactory', 'FileFactory', 'Restangular', 'MessageFactory', 'ContentFactory',
			function HomeController($location, $scope, TagsFactory, FileFactory, Restangular, MessageFactory, ContentFactory) {
				var self = this;
				self.newTagValue = "";
				self.attachment = "";
				self.message = "";
				self.messageDetails = {
					to: undefined,
					from: undefined,
					toName: undefined,
					fromName: undefined,
					attachments: [],
					tags: [],
					messageId: undefined
				};

				var queryParams = $location.search();

				var flockEvent = JSON.parse(queryParams.flockEvent);
				console.log(flockEvent);

				self.messageDetails.from = flockEvent.userId; self.messageDetails.fromName = flockEvent.userName;
				self.messageDetails.to = flockEvent.chat; self.messageDetails.toName = flockEvent.chatName;

				
				TagsFactory.get({'userId': 'u:v77sdynhzi74zy44'}, function(data) {
					console.log(data);
					self.allTags = data;
					
				});

				self.submit = function() {
					var message = {
						'message': self.message,
						'userId': 'u:v77sdynhzi74zy44'
					};
					MessageFactory.save(message, function(data) {
						self.messageDetails.messageId = data.id;
						console.log(self.messageDetails);
						var tags = self.messageDetails.tags.map(function(val) {return val.id});
						var cdata = {
							"to":  self.messageDetails.to,
							"userId": 'u:v77sdynhzi74zy44',
							"content_json": {
								"message": data.id,
								"attachments": self.messageDetails.attachments,
								"tags": tags 
							}
						}
						ContentFactory.save(cdata, function(data) {
							console.log(data);
							flock.close();
						});
					});


					// form submit api end point
				};

				self.saveTag = function () {
					// on click event to save that tag in tags[] and update in db
					var tag = {
						'tag_value': self.newTagValue,
						'userId': 'u:v77sdynhzi74zy44'
					};
					TagsFactory.save(tag, function (data) {
						self.messageDetails.tags.push(data);
						self.newTagValue = "";
						self.allTags.push(data);
						console.log(self.messageDetails.tags);
					});
				};

				self.uploadAttachment = function () {
					// on file select event to save file and append id in attachments[]
				};

				self.getTags = function () {
					// search for the tags
				};

				$scope.fileNameChanged = function () {
					
					var fd = new FormData();
        			fd.append('file_data', self.attachment);
        			fd.append('userId', 'u:v77sdynhzi74zy44');
					console.log(fd);
					Restangular.one('file/').withHttpConfig({transformRequest: angular.identity})
                    .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function(data) {
                    	self.messageDetails.attachments.push(data.id);
                    });
				};
			}
		]

	});




