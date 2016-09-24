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
		controller: ['$location', '$scope', 'TagsFactory',
			function HomeController($location, $scope, TagsFactory) {
				var self = this;
				self.newTagValue = "";
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
					// save the message and update messageId

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
			}
		]

	});




//sidebar
	angular.
		module('taggApp').
		component('sidebar', {
			templateUrl: 'templates/sidebar.html',
			controller: ['$scope', '$http', function($scope,$http){
        self.selectedtags = {};
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


			  $scope.data = '{"files":[{"id":"123","file_data":"http://www.example.com/dir/file.html"},{"id":"456","file_data":"http://www.anotherexample.com/directory/hello.img"}]}';
				$scope.message = '{"messages":[{"id":"123","message_content":"let the game begin brhebv vreuhv vrever bnvuriuev nvernvrr rvnunuie newfneufnun nfiueifuj nfenfe f3woihw"},{"id":"456","message_content":"it was elementary watson"}]}';



				$scope.fillFiles = function() {
					$http.get('http').success(function(data){
				      $scope.data = data;
				    });

					$scope.files = [];
					var data = JSON.parse($scope.data);
					//console.log(data.files);
					for(var i in data.files){
						var filename = data.files[i].file_data.substring(data.files[i].file_data.lastIndexOf('/')+1);

						$scope.files.push(filename);
						//console.log(obj.file_data);
					}
					//console.log($scope.skills);
				}

				$scope.fillMessages = function() {
					$http.get('http').success(function(data){
				      $scope.data = data;
				    });

					$scope.messages = [];
					var data = JSON.parse($scope.message);
					//console.log(data.files);
					for(var i in data.messages){
						var obj=data.messages[i];

						$scope.messages.push(obj.message_content);
						//console.log(obj.file_data);
					}
					//console.log($scope.skills);
				}

			}]
		});
