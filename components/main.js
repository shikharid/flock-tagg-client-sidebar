/**
 * Created by harsh.l on 24/09/16.
 */
'use strict';
angular.
	module('taggApp').
	component('home', {
		templateUrl: 'templates/base.html',
		controller: [
			function homeController () {
				var self = this;
				//this.name = "harsh";
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
