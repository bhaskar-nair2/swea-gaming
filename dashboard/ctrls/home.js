angular.module('gameApp')
	.controller('homeCtrl', function ($scope, $rootScope, $timeout, $http, $state, $window) {
		$rootScope.checkAuth();
		$rootScope.subscribe = function (x) {
			if ($scope.games[x].status == false) {
				$('#subscribeGame').modal('show');
				swal({
						title: 'Confirm subscription for ' + $scope.games[x].name + ' ?',
						type: 'success',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, subscribe!'
					})
					.then(function () {
						$http({
								method: 'POST',
								url: $rootScope.apiUrl + 'user/subscribe',
								data: {
									authKey: $rootScope.authKey,
									game: x
								}
							})
							.then(function (res) {
								if (res.data.status == true) {
									swal({
											title: 'Success',
											text: res.data.msg,
											type: 'success',
											timer: 2000,
											showConfirmButton: false
										})
										.then(
											function () {},
											function (dismiss) {
												if (dismiss === 'timer') {
													$window.location.reload();
												}
											}
										);
								} else
									swal({
										title: 'Failed',
										text: res.data.msg,
										type: 'error',
										timer: 2000,
										showConfirmButton: true
									});
							}, function (res) {
								swal("Fail", "Some error occurred, try again.", "error");
							});
					});
			} else {
				swal('Snap', 'Already Subscribed !!', 'info')
			}
		};
		$scope.addTransaction = function () {
			$('#btnLoad').button('loading');
			$scope.data = {
				authKey: $rootScope.authKey,
				phone: $scope.transaction.phone,
				amount: $scope.transaction.amount,
				tid: $scope.transaction.tid
			};
			$http({
				method: 'POST',
				url: $rootScope.apiUrl + 'user/addTransaction',
				data: $scope.data
			}).then(function (res) {
				if (res.data.status == true) {
					swal({
						title: 'Success',
						text: res.data.msg,
						type: 'success',
						showConfirmButton: false
					});
					$timeout(function () {
						$window.location.reload();
					}, 2000);
				} else {
					swal({
						title: 'Failed',
						text: res.data.msg,
						type: 'error',
						showConfirmButton: true
					});
					$('#btnLoad').button('reset');
				}
			}, function (res) {
				swal("Fail", "Some error occurred, try again.", "error");
				$('#btnLoad').button('reset');
			});
		};
	});
