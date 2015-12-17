angular.module('app')
.controller('DashboardCtrl', function($scope, $stateParams, $rootScope, $cordovaFile,  Upload, $timeout, outils) {
	
$scope.filepathChooser = function() {
	window.plugins.mfilechooser.open([], function (uri) {
		//Here uri provides the selected file path.

		var initPath = uri.split('Download')[0] + "Download/"
		var pathFile = uri.split('Download')[1].split('').splice(0,1).join('')
/*
		var uriTab  = uri.split('/')
		var path = ''
		for (var i  = 0; i < uriTab.length - 1; i++){
			path += uriTab[i] + '/' 
		}
		var nomFichier  = uriTab[uriTab.length - 1]
		var pathDest = "file://" + path 
		var fullPath = pathDest + nomFichier

*/
"/storage/emulated/0/Download/Anglais_FFFF.pdf"
"1 EXTERNAL ROOT DIRECTORY = /storage/emulated/0/"
"2 nomFichier"
"3 cordova.file.dataDirectory"
"4 date"
	alert(uri)
	alert(initPath)
	alert(pathFile)

    $cordovaFile.copyFile(initPath, pathFile, cordova.file.dataDirectory, "new_file.txt")
      .then(function (success) {
        // success
        alert(success)
      }, function (error) {
        // error
        alert(error)

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


