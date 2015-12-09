angular.module('app')
.controller('DashboardCtrl', function($scope, $stateParams, $rootScope, $cordovaFile,  Upload, $timeout) {
 $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];

        console.log(errFiles)
        if (file) {

    // COPY


    $cordovaFile.copyFile(cordova.file.dataDirectory, file, cordova.file.tempDirectory, "new_file"+ file)
      .then(function (success) {
       console.log(success)
      }, function (error) {
        // error
      });


        }   
    }
    

})