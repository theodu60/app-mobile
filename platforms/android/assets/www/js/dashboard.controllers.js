angular.module('app')
.controller('DashboardCtrl', function($scope, $stateParams,outils, $rootScope, $cordovaFile) {

      $cordovaFile.getFreeDiskSpace()
      .then(function (success) {
         console.log(success)
      }, function (error) {
          // error
      });

});


