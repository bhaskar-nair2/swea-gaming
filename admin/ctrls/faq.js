angular.module('gameApp')
	.controller('faqCtrl', function ($scope, $rootScope, $http, $location, $state) {
		$rootScope.checkAuth();
	});
