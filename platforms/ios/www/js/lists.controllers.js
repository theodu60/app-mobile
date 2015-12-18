angular.module('app')
.controller('ListsCtrl', function($scope, $stateParams, outils, $state) {
	$scope.lists = [] 
	$scope.lists = outils.getListHis()
	$scope.del = function (str){
		outils.delListHis(str)
		$scope.lists = outils.getListHis()
	}
	$scope.read = function (str){
		$state.go('app.dashboard', { name: str});
	}
	if ($scope.lists.length == 0){
		alert("Aucuns fichiers disponible")
		$state.go('app.browse')
	}
});


