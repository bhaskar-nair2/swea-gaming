angular.module('gameApp')
	.controller('registerCtrl', function ($scope, $rootScope, $location, $http, $state) {
		$rootScope.checkAuth();
		$scope.register = function () {
			if ($scope.user.pass1 == $scope.user.pass2) {
				$scope.data = {
					email: $scope.user.email,
					password: $scope.user.pass1,
					info: {
						university: $scope.user.uni,
						name: $scope.user.name,
						phone: $scope.user.phone
					}
				};
				$http({
					method: 'POST',
					url: $rootScope.apiUrl + 'user/register',
					data: $scope.data
				}).then(function (res) {
					if (res.data.status == true) {
						$state.go('dashboard.login');
						swal({
							title: 'Success',
							text: res.data.msg,
							type: 'success',
							showConfirmButton: true
						});
					} else {
						swal({
							title: 'Failed',
							text: res.data.msg,
							type: 'error',
							showConfirmButton: true
						});
					}
				}, function (res) {
					swal("Fail", "Some error occurred, try again.", "error");
				});
			} else {
				swal("Fail", "Password's are not same, try again.", "error");
			}
		};
	});
