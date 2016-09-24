'use strict';
var API_URL = "https://32915b8c.ngrok.io/";
angular.
  module('taggApp').
  component('sidebar', {
    templateUrl: 'templates/sidebar.html',
    controller: ['$scope', '$http', 'TagsFactory', '$rootScope', function($scope,$http, TagsFactory, root){
      var self = this;
      self.selectedtags = [];

        self.allTags = [];
        TagsFactory.get({'userId': root.userId}, function(data) {
          self.allTags = data;
          console.log("data sidebar")
          console.log(data);
        });


      $scope.data = '[{"file_data":"/media/abc.png","id":2},{"file_data":"/media/pqr.png","id":4}]';
      $scope.message='[{"message_content":"abc","id":4},{"message_content":"hfeu jceeuw hduhewiuwe shuwqhdwu hduwhdwuhdwu duqhi qiuhqi iwmcwknmew ncqwlnlq cqqewhfieo idjqwijdw","id":4}]';




      $scope.fillFiles = function() {

        var tags = self.selectedtags.map(function(val) { return val.id});
        var params = {
              userId: root.userId,
              tags: tags
          };

        $http.post(API_URL + "search/file/", params , {async:true}).success(function(data){

            $scope.files = data;
            for(var i in $scope.files){
              $scope.files[i].fileName = $scope.files[i].file_data.substring($scope.files[i].file_data.lastIndexOf('/')+1).substring(0, 25);
            }
          });

        //console.log($scope.skills);
      }

      root.$watch('userId', function() {$scope.fillFiles() });
      $scope.fillMessages = function() {
        var tags = self.selectedtags.map(function(val) { return val.id});
        var params = {
            userId: root.userId,
            tags: tags
        };

        $http.post(API_URL + "search/message/", params,{async:true}).success(function(message){

            $scope.messages = message;
          });


        //console.log($scope.skills);
      };

      root.$watch('userId', function() { $scope.fillMessages() });
      // $scope.broadcast = function function_name(argument) {
      //   $scope.$emit('searchSelectEvent', {
      //     data: argument
      //   });
      // }

      $scope.openUrl = function (url) {
        console.log(API_URL + url.substring(1));
        flock.openBrowser(API_URL + url.substring(1));
      }

    }]
  });
