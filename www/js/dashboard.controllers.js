angular.module('app')
.controller('DashboardCtrl', function($scope, $stateParams, $rootScope, $cordovaFile,  Upload, $timeout, outils) {
	
$scope.filepathChooser = function() {
	window.plugins.mfilechooser.open([], function (uri) {
		//Here uri provides the selected file path.
		console.log('file path', uri);
		alert(cordova.file.dataDirectory);

    $cordovaFile.copyFile(uri, cordova.file.dataDirectory + "test.his")
      .then(function (success) {
        alert('ok')
      }, function (error) {
        alert(JSON.stringify(error))
      });

	}, function (error) {
		alert(error);
	});
 };
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
        var tab = outils.parsing($scope.content )
        console.log(tab)
    };


"/storage/emulated/0/Download/Anglais_FFFF.pdf"
})


