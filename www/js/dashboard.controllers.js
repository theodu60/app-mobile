angular.module('app')
.controller('DashboardCtrl', function($scope, $stateParams, $rootScope, $cordovaFile,  Upload, $timeout, outils) {
	
    $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
        var tab = outils.parsing($scope.content )
        console.log(tab)
    };



})