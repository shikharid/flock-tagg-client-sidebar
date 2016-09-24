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

angular.
	module('taggApp').
	component('home', {
		templateUrl: 'templates/base.html',
		controller: ['$location', '$scope',
			function HomeController($location, $scope) {
				var self = this;
				self.selectedtags = {};
				self.messageDetails = {
					to: undefined,
					from: undefined,
					toName: undefined,
					fromName: undefined,
					attachments: [],
					tags: [],
					messageId: undefined
				};

				self.allTags = [
					{name: "server", id: 1},
					{name: "data", id: 2},
					{name: "logs", id: 3},
					{name: "history", id: 4},
					{name: "photos", id: 5}
				];

				$scope.onTagRemove = function (removedTag) {
					var idx = self.messageDetails.tags.indexOf(removedTag.id);
					if(idx > -1) self.messageDetails.tags.splice(idx, 1);
					console.log(self.messageDetails.tags);
				};

				$scope.onTagSelect = function (selectedTag) {
					self.messageDetails.tags.push(selectedTag.id);
					console.log(self.messageDetails.tags);
				};

				$scope.searchTag = function (searchString) {

				};

				var queryParams = $location.search();
        //console.log(queryParams);
				var flockEvent = JSON.parse(queryParams.flockEvent);
				console.log(flockEvent);

				self.messageDetails.from = flockEvent.userId; self.messageDetails.fromName = flockEvent.userName;
				self.messageDetails.to = flockEvent.chat; self.messageDetails.toName = flockEvent.chatName;

				self.submit = function() {
					// save the message and update messageId

					// form submit api end point
				};

				self.saveTag = function () {
					// on click event to save that tag in tags[] and update in db
				};

				self.uploadAttachment = function () {
					// on file select event to save file and append id in attachments[]
				};

				self.getTags = function () {
					// search for the tags
				};
			}
		]

	});
