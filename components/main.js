/**
 * Created by harsh.l on 24/09/16.
 */
'use strict';
angular.
	module('taggApp').
	component('home', {
		templateUrl: 'templates/base.html',
		controller: ['$location',
			function homeController ($location) {
				var self = this;
				self.messageDetails = {
					to: undefined,
					from: undefined,
					toName: undefined,
					fromName: undefined
				}
				var queryParams = $location.search();
				
				var flockEvent = JSON.parse(queryParams.flockEvent);

				self.messageDetails.from = flockEvent.userId; self.messageDetails.fromName = flockEvent.userName;
				self.messageDetails.to = flockEvent.chat; self.messageDetails.toName = flockEvent.chatName;
			}
		]

	});