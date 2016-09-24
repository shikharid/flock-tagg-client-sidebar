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


      $scope.data = '[{"file_data":"/media/abc.png","id":2},{"file_data":"/media/pqr.png","id":4}]';
      $scope.message='[{"message_content":"abc","id":4},{"message_content":"hfeu jceeuw hduhewiuwe shuwqhdwu hduwhdwuhdwu duqhi qiuhqi iwmcwknmew ncqwlnlq cqqewhfieo idjqwijdw","id":4}]';



      $scope.fillFiles = function() {
        var tagslist=[];
        for(var i in self.selectedtags)
          tagslist.push(self.selectedtags[i].id);
        var params = {
              userId: 'u:v77sdynhzi74zy44',
              tags: [1,2]
          };
        $http.post("http://172.16.153.248:8000/search/file/", params).success(function(data){
            $scope.data = data;
            console.log($scope.data[0].file_data);
            $scope.files = [];
            //var data = JSON.parse($scope.data);

            for(var i in $scope.data){
              var filename = $scope.data[i].file_data.substring($scope.data[i].file_data.lastIndexOf('/')+1);
              //console.log(filename);
              $scope.files.push(filename);
              //console.log(obj.file_data);
            }
          });


        //console.log($scope.skills);
      }

      $scope.fillMessages = function() {
        var tagslist=[];
        for(var i in self.selectedtags)
          tagslist.push(self.selectedtags[i].id);
        var params = {
          userId: 'u:v77sdynhzi74zy44',
          tags: [1,2]
          };
        $http.post("http://172.16.153.248:8000/search/message/", params).success(function(message){
            $scope.message = message;
            $scope.messages = [];
            //var data = JSON.parse($scope.message);
            //console.log(data.files);
            for(var i in $scope.message){
              var obj=$scope.message[i];

              $scope.messages.push(obj.message_content);
              //console.log(obj.file_data);
            }
          });


        //console.log($scope.skills);
      }

    }]
  });
