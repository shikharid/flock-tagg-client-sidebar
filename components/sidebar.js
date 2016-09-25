'use strict';
var API_URL = "https://75597844.ngrok.io/";
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
component('sidebar', {
    templateUrl: 'templates/sidebar.html',
    controller: ['$location','$scope', '$http', 'TagsFactory', function($location,$scope,$http, TagsFactory){
        var self = this;
        var queryParams = $location.search();
        var flockEvent = JSON.parse(queryParams.flockEvent);
        console.log(flockEvent);
        self.selectedtags = [];
        self.userId = flockEvent.userId || 'u:v77sdynhzi74zy44';



        self.allTags = [];
        TagsFactory.get({'userId': self.userId}, function(data) {
            self.allTags = data;
            console.log("data sidebar");
            console.log(data);
        });





        $scope.fillFiles = function() {

            var tags = self.selectedtags.map(function(val) { return val.id});
            var params = {
                userId: self.userId,
                tags: tags
            };

            $http.post(API_URL + "search/file/", params , {async:true}).success(function(data){

                $scope.files = data;
                for(var i in $scope.files){
                    $scope.files[i].fileName = $scope.files[i].file_data.substring($scope.files[i].file_data.lastIndexOf('/')+1).substring(0, 17);
                }
            });

            //console.log($scope.skills);
        };

        $scope.fillFiles();
        $scope.$watch('userId', function() {$scope.fillFiles() });
        $scope.fillMessages = function() {
            var tags = self.selectedtags.map(function(val) { return val.id});
            var params = {
                userId: self.userId,
                tags: tags
            };

            $http.post(API_URL + "search/message/", params,{async:true}).success(function(message){

                $scope.messages = message;
            });


        };
        $scope.fillMessages();
        $scope.$watch('userId', function() { $scope.fillMessages() });

        $scope.openUrl = function (url) {
            console.log(API_URL + url.substring(1));
            flock.openBrowser(API_URL + url.substring(1));
        }

    }]
});


