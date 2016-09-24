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
<<<<<<< HEAD
		controller: [
			function homeController () {
=======
		controller: ['$location', '$scope',
			function homeController ($location, $scope) {
>>>>>>> e2c939d1ba15ede3b620bee6d98e730144aef386
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
//sidebar
	angular.
		module('taggApp').
		component('sidebar', {
			templateUrl: 'templates/sidebar.html',
			controller: ['$scope', '$http', function($scope,$http){

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
