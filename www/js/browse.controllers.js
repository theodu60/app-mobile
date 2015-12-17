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

$scope.chartConfig = {
				data: {
            table: 'freq',
            startRow: 1,
            endRow: 17,
            endColumn: 7
        },
	       options: {


        chart: {
            polar: true,
            type: 'column'
        },

        title: {
            text: 'Wind rose for South Shore Met Station, Oregon'
        },

        subtitle: {
            text: 'Source: or.water.usgs.gov'
        },

        pane: {
            size: '85%'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 100,
            layout: 'vertical'
        },

        xAxis: {
            tickmarkPlacement: 'on'
        },

        yAxis: {
            min: 0,
            endOnTick: false,
            showLastLabel: true,
            title: {
                text: 'Frequency (%)'
            },
            labels: {
                formatter: function () {
                    return this.value + '%';
                }
            },
            reversedStacks: false
        },

        tooltip: {
            valueSuffix: '%'
        },

        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on'
            }
        }
	       },
        
    }

    



})


