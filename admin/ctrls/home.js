angular.module('gameApp')
	.controller('homeCtrl', function ($scope, $rootScope, $timeout, $http, $state, $window) {
		$('#viewUserModal').on('shown.bs.modal', function () {
			$(document).off('focusin.modal');
		});
		$rootScope.games = [{
			name: 'CSGO',
			img: '../img/csgo-cart.jpg',
			id: 0
		}, {
			name: 'FIFA',
			img: '../img/fifa-cart.jpg',
			id: 1
		}, {
			name: 'BLUR',
			img: '../img/blur-cart.jpg',
			id: 2
		}, {
			name: 'CR',
			img: '../img/cr-cart.jpg',
			id: 3
		}];
		$scope.roles = [{
			id: 0,
			name: 'Admin'
		}, {
			id: 1,
			name: 'Volunteer'
		}];
		$rootScope.checkAuth();
		$rootScope.viewUserModal = function (x) {
			$('#viewUserModal').modal('show');
			$scope.userData = x;
		};
		$rootScope.openStaffModal = function () {
			if ($rootScope.homeData.type == 0)
				$('#addStaff').modal('show');
			else
				swal("Fail", "You are not authorized !!", "info");

		};
		$scope.unsubscribe = function (x, y) {
			if ($rootScope.homeData.type == 0)
				swal({
					title: 'Are you sure to unsubscribe from this game?',
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes!'
				})
				.then(function () {
					$http({
							method: 'POST',
							url: $rootScope.apiUrl + 'admin/unsubscribe',
							data: {
								adminKey: $rootScope.adminKey,
								uId: y,
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
			else
				swal("Fail", "You are not authorized !!", "info");
		};
		$scope.deleteUser = function (x) {
			if ($rootScope.homeData.type == 0)
				swal({
					title: 'Are you sure to delete this user?',
					text: "You won't be able to revert this!",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!'
				})
				.then(function () {
					$http({
							method: 'POST',
							url: $rootScope.apiUrl + 'admin/deleteUser',
							data: {
								adminKey: $rootScope.adminKey,
								uId: x
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
			else
				swal("Fail", "You are not authorized !!", "info");
		};
		$scope.deleteStaff = function (x) {
			if ($rootScope.homeData.type == 0)
				swal({
					title: 'Are you sure to delete this staff?',
					text: "You won't be able to revert this!",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!'
				})
				.then(function () {
					$http({
							method: 'POST',
							url: $rootScope.apiUrl + 'admin/deleteStaff',
							data: {
								adminKey: $rootScope.adminKey,
								uId: x
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
			else
				swal("Fail", "You are not authorized !!", "info");
		};
		$scope.changeTransactionStatus = function (tid) {
			if ($rootScope.homeData.type == 0)
				swal({
					title: 'Enter the status',
					input: 'radio',
					inputOptions: {
						'true': 'Paid',
						'false': 'Not viewed',
						'failed': 'Failed'
					},
					showCancelButton: true,
					inputValidator: function (value) {
						return new Promise(function (resolve, reject) {
							if (value) {
								resolve();
							} else {
								reject('You need to write something!');
							}
						})
					}
				})
				.then(function (result) {
					$http({
							method: 'POST',
							url: $rootScope.apiUrl + 'admin/changeTransactionStatus',
							data: {
								adminKey: $rootScope.adminKey,
								uId: $scope.userData._id,
								tid: tid,
								status: '' + result
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
			else
				swal("Fail", "You are not authorized !!", "info");
		};
		$scope.addPayment = function () {
			if ($rootScope.homeData.type == 0)
				swal({
					title: 'Enter the amount',
					input: 'number',
					showCancelButton: true,
					inputValidator: function (value) {
						return new Promise(function (resolve, reject) {
							if (value) {
								resolve();
							} else {
								reject('You need to write something!');
							}
						})
					}
				})
				.then(function (result) {
					$http({
							method: 'POST',
							url: $rootScope.apiUrl + 'admin/paymentHandler',
							data: {
								adminKey: $rootScope.adminKey,
								uId: $scope.userData._id,
								money: result
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
			else
				swal("Fail", "You are not authorized !!", "info");
		};
		$scope.addStaff = function (x) {
			if ($rootScope.homeData.type == 0)
				$http({
					method: 'POST',
					url: $rootScope.apiUrl + 'admin/addStaff',
					data: {
						adminKey: $rootScope.adminKey,
						email: x.email,
						name: x.name,
						password: x.password,
						type: x.type
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
					} else {
						swal({
							title: 'Failed',
							text: res.data.msg,
							type: 'error',
							timer: 2000,
							showConfirmButton: true
						});
					}
				}, function (res) {
					swal("Fail", "Some error occurred, try again.", "error");
				});
			else
				swal("Fail", "You are not authorized !!", "info");
		};
	});
