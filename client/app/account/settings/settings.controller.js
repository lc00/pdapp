'use strict';

angular.module('pdappApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};
    $scope.user = Auth.getCurrentUser();

    $scope.updateProfile = function (form) {
      console.log('Check data', form);
      if (form.$valid) {
        Auth.updateUser($scope.user)
          .then(function () {
            $scope.message = 'Profile successfully updated.';
          })
          .catch(function () {
            console.log('Error of some form')
          })
      }
    };

    $scope.changePassword = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(function () {
            $scope.message = 'Password successfully changed.';
          })
          .catch(function () {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    };
  });
