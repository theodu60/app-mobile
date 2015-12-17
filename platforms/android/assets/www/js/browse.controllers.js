angular.module('app')
.controller('BrowseCtrl', function($scope, $stateParams, $rootScope, $cordovaFile, $timeout, outils, $localStorage) {
		         $scope.content = "rien"

$scope.filepathChooser = function() {
	window.plugins.mfilechooser.open([], function (uri) {
		var initPath = uri.split('Download')[0] + "Download/"
		var pathFile = uri.split('Download')[1].split('').splice(1,uri.split('Download')[1].split('').length - 1).join('')

	$cordovaFile.readAsText(cordova.file.externalRootDirectory, "Download/" + pathFile)
	  .then(function (StrContent) {
		var name = outils.addListHis(StrContent)
	    // WRITE
	    $cordovaFile.writeFile(cordova.file.dataDirectory, name, StrContent, true)
	      .then(function (success) {
	        // success
	        alert('ok')
	      }, function (error) {
	        // error
	        alert(error.message)
	      });
	  }, function (error) {
	  	alert(error.message)
	  });

	}, function (error) {
		alert(error);
	});
 };




})


