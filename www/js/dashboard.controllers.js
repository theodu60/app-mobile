angular.module('app')
.controller('DashboardCtrl', function($scope, $stateParams, $rootScope, $cordovaFile, $timeout, outils, $state, $ionicLoading) {
	$scope.tab = []
	$scope.test = []
	$scope.valueForRecap = ['AIR_TEMPERATURE', 'REL_HUMIDITY', 'AIR_PRESSURE', 'LOCAL_WS_2MIN_MNM', 'LOCAL_WINDDIR_INSTANT']
	$scope.recapitulatif = []
	$scope.heure = []
	$scope.chartConfig = {}
	$scope.lineCharts = []
	$scope.fullCharts = []
	  $scope.show = function() {
	    $ionicLoading.show({
	      template: 'Loading...'
	    });
	  };
	  $scope.hide = function(){
	    $ionicLoading.hide();
	  };

	  $scope.show()


	$cordovaFile.checkFile(cordova.file.dataDirectory, $state.params.name)
	.then(function (success) {
		$cordovaFile.readAsText(cordova.file.dataDirectory, $state.params.name)
		.then(function (file) {
			$scope.tab = outils.parsing(file)


			for (var i = 0; i < 3; i++){
				$scope.recapitulatif.push($scope.getOneRecap($scope.valueForRecap[i], $scope.tab))
    			$scope.lineCharts.push($scope.buildChartLine($scope.valueForRecap[i], $scope.getHoursRecap($scope.valueForRecap[i], $scope.tab), $scope.getOneRecap($scope.valueForRecap[i], $scope.tab)))
				$scope.fullCharts.push($scope.buildFullLine($scope.valueForRecap[i], $scope.tab))
			}

			$scope.recapitulatif.push({
				name: 'LOCAL_WS_2MIN_MNM (LOCAL_WINDDIR_INSTANT)',
				min: $scope.getOneRecap($scope.valueForRecap[3], $scope.tab).min + " (" + $scope.getOneRecap($scope.valueForRecap[4], $scope.tab).min + ")",
				minDate: $scope.getOneRecap($scope.valueForRecap[3], $scope.tab).minDate,
				max: $scope.getOneRecap($scope.valueForRecap[3], $scope.tab).max + " (" + $scope.getOneRecap($scope.valueForRecap[4], $scope.tab).max + ")",
				maxDate: $scope.getOneRecap($scope.valueForRecap[3], $scope.tab).maxDate,
				avg: $scope.getOneRecap($scope.valueForRecap[3], $scope.tab).avg + " (" + $scope.getOneRecap($scope.valueForRecap[4], $scope.tab).avg + ")",
			})
    		$scope.lineCharts.push($scope.buildChartLine($scope.valueForRecap[3], $scope.getHoursRecap($scope.valueForRecap[3], $scope.tab), $scope.getOneRecap($scope.valueForRecap[3], $scope.tab)))
    		$scope.lineCharts.push($scope.buildChartLine($scope.valueForRecap[4], $scope.getHoursRecap($scope.valueForRecap[4], $scope.tab), $scope.getOneRecap($scope.valueForRecap[4], $scope.tab)))
			$scope.fullCharts.push($scope.buildFullLine($scope.valueForRecap[3], $scope.tab))
			$scope.fullCharts.push($scope.buildFullLine($scope.valueForRecap[4], $scope.tab))
			$scope.rose = $scope.getRose($scope.tab)


    // Parse the data from an inline table using the Highcharts Data plugin
    $('#container').highcharts({
        data: {
            table: 'freq',
            startRow: 1,
            endRow: 17,
            endColumn: 7
        },

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
    	});


	  		$scope.hide()


		}, function (error) {
			alert(error)
		});
	}, function (error) {
		alert('erreur: ' + error.message)
		$state.go('app.lists')
	});

	$scope.buildFullLine = function (key, tab){
		var chartConfig = {
	        options: {
	            chart: {
	                zoomType: 'x'
	            },
	            title: {
	                text: key
	            },
	            subtitle: {
	                text: document.ontouchstart === undefined ?
	                        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
	            },
	            xAxis: {
	                type: 'datetime'
	            },
	            yAxis: {
	                title: {
	                    text: 'Valeurs'
	                }
	            },
	            legend: {
	                enabled: false
	            },
	            plotOptions: {
	                area: {
	                    fillColor: {
	                        linearGradient: {
	                            x1: 0,
	                            y1: 0,
	                            x2: 0,
	                            y2: 1
	                        },
	                        stops: [
	                            [0, Highcharts.getOptions().colors[0]],
	                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
	                        ]
	                    },
	                    marker: {
	                        radius: 2
	                    },
	                    lineWidth: 1,
	                    states: {
	                        hover: {
	                            lineWidth: 1
	                        }
	                    },
	                    threshold: null
	                }
	            },
	        },
            series: [{
                type: 'area',
                name: 'valeur',
                data: []
            }]
        }
               // $scope.debug = chartConfig

        for (var i in tab){
        	var d = new Date(tab[i]['CREATEDATE'])
        	var utc = Date.UTC(d.getFullYear(),d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds())
        	if (utc){
        		var tmp = [utc,  tab[i][key]/100]
        		 chartConfig.series[0].data.push(tmp)        		
        	}
        }

        return chartConfig
	}


    $scope.buildChartLine = function (key, data, dayData){
	    var chartConfig = {
	        options: {
	            chart: {
	                type: 'line'
	            },
		        xAxis: {
		            categories: []
		        },
			      yAxis: {
			        title: {
			          text: 'Valeurs'
			        },
			        plotLines: []
			      },
			      plotOptions: {
			        line: {
			          dataLabels: {
			            align: 'center',
			            enabled: true,
			            style: {
			              fontWeight: 'bold',
			              color: 'black',
			              textShadow: null
			            }
			          }
			        }

			      },
	        },
	        series: [],
	        title: {
	            text: key
	        },

	        loading: false
	    }

	    var minData = []
	    var maxData = []
	    var avgData = []

	    for (var i in data){
	    	chartConfig.options.xAxis.categories.push(data[i].heure + " heure")
	    	minData.push(data[i].data.min)
	    	maxData.push(data[i].data.max)
	    	avgData.push(data[i].data.avg)
	    }
    	chartConfig.series.push({name: "Min", data: minData})
    	chartConfig.series.push({name: "Max", data: maxData})
    	chartConfig.series.push({name: "Moyenne", data: avgData})

		chartConfig.options.yAxis.plotLines.push({
          color: 'red',
          dashStyle: 'shortdash',
          width: 2,
          value: dayData.min,
          name: 'min-jour'
		})
		chartConfig.options.yAxis.plotLines.push({
          color: 'black',
          dashStyle: 'shortdash',
          width: 2,
          value: dayData.avg,
          name: 'avg-jour'
		})
		chartConfig.options.yAxis.plotLines.push({
          color: 'green',
          dashStyle: 'shortdash',
          width: 2,
          value: dayData.max,
          name: 'max-jour'
		})
		$scope.heure = dayData

	    return chartConfig


    }
    $scope.getHoursRecap = function (key, tab){
    	var tabHeure = {};
    	var tmpHeure = new Date(tab[0]['CREATEDATE']).getHours()

		for (var i in tab){
			var h = new Date(tab[i]['CREATEDATE']).getHours()
			var row = tab[i]
			if (tmpHeure != h)
				tmpHeure = h			
			if (!tabHeure[h])
				tabHeure[h] = []
			tabHeure[h].push(row)
		}	
		var data = []
		for (var h in tabHeure){
			if (h != 'NaN')
			data.push({heure: h, data: $scope.getOneRecap(key, tabHeure[h])})
		}
		return data
    }
	$scope.getOneRecap = function (key, tab){
		var lowest = {
			value : tab[0][key],
			date: new Date ()
		};
		var highest = {
			value : tab[0][key],
			date: new Date ()
		};
		var tmp
		var avg = 0
		var denom = 0
		var avgFinal = 0

		for (var i in tab){
		    tmp = parseFloat(tab[i][key])
		    if (!tmp){
		    	avg += 0		    	
		    } else {
		    	avg += tmp
		    	denom ++	    	
		    }
		    if (parseFloat(tmp) < parseFloat(lowest.value)){
		    	lowest.value = tmp;
		    	lowest.date = tab[i]['CREATEDATE']	    	
		    }
		    if (parseFloat(tmp) > parseFloat(highest.value)){
		    	highest.value = tmp;
		    	highest.date = tab[i]['CREATEDATE']	    	
		    }
		}
		if (denom > 0)
			var avgFinal = Math.round(avg/denom * 10) / 10

		return {
			name: key,
			min: lowest.value,
			minDate: lowest.date,
			max: highest.value,
			maxDate: highest.date,
			avg: avgFinal
		}
	}
	function sortNumber(a,b) {
	    return a - b;
	}
	$scope.meanThatTab = function (tab) {
	    var sum = 0

	    for (var i in tab){
	    	sum += tab[i]
	    }
	    var res = Math.round(sum/tab.length * 10) / 10
	    if (!res  || sum == 0 || !tab || tab.length == 0)
	    	res = 0
	    return (res)
	}

	$scope.getRose = function (tab){
		var row = {}
		for (var i in tab){
			if (!row[tab[i]['LOCAL_WD_2MIN_MNM']]){
				row[tab[i]['LOCAL_WD_2MIN_MNM']] = []
			}
			row[tab[i]['LOCAL_WD_2MIN_MNM']].push(tab[i]['LOCAL_WINDDIR_INSTANT'])
		}

		var data = {}

		for (var i in row){
				var res = ((Math.round(parseFloat($scope.meanThatTab(row[i])) * 10)) / 10 )
				if (i != "undefined"){
					if (isFinite(res))
					{
							data[i] = res
					} else {
							data[i] = 0
					}					
				}


		}

		var finalTab = []

		for (var i in data){
			finalTab.push({key: i  + "°", value: Math.round(parseInt(data[i]))})
		}

		return (finalTab)
	}


})


