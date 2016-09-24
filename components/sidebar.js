'use strict';
var API_URL = "https://32915b8c.ngrok.io/";
angular.
  module('taggApp').
  component('sidebar', {
    templateUrl: 'templates/sidebar.html',
    controller: ['$scope', '$http', 'TagsFactory', function($scope,$http, TagsFactory){
      var self = this;
      self.selectedtags = [];

        self.allTags = [];
        TagsFactory.get({'userId': 'u:v77sdynhzi74zy44'}, function(data) {
          self.allTags = data;
          console.log("data sidebar")
          console.log(data);
        });

      $scope.data = '[{"file_data":"/media/abc.png","id":2},{"file_data":"/media/pqr.png","id":4}]';
      $scope.message='[{"message_content":"abc","id":4},{"message_content":"hfeu jceeuw hduhewiuwe shuwqhdwu hduwhdwuhdwu duqhi qiuhqi iwmcwknmew ncqwlnlq cqqewhfieo idjqwijdw","id":4}]';



      $scope.fillFiles = function() {
        
        var tags = self.selectedtags.map(function(val) { return val.id});
        var params = {
              userId: 'u:v77sdynhzi74zy44',
              tags: tags
          };

        $http.post(API_URL + "search/file/", params , {async:true}).success(function(data){
            
            $scope.files = data;
            for(var i in $scope.files){
              $scope.files[i].fileName = $scope.files[i].file_data.substring($scope.files[i].file_data.lastIndexOf('/')+1);
            }
          });

        //console.log($scope.skills);
      }

      $scope.fillMessages = function() {
        var tags = self.selectedtags.map(function(val) { return val.id});
        var params = {
            userId: 'u:v77sdynhzi74zy44',
            tags: tags
        };

        $http.post(API_URL + "search/message/", params,{async:true}).success(function(message){
            
            $scope.messages = message;
          });


        //console.log($scope.skills);
      };

      $scope.broadcast = function function_name(argument) {
        $scope.$emit('searchSelectEvent', {
          data: argument
        });
      }

    }]
  });
