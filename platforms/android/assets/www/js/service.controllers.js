angular.module('app')
  .factory('outils', function($cordovaFile) {
    return {
      /*
      	Parametres: String
      	retour: JSON
      */
      parsing: function(str) {
        var array = str.split('\r\n')
        var name = array[0]
        var header = array[1].split('\t')
        var headerObj = {}
        var tmp = {}
        var obj = []
        for (var i in header){
          headerObj[header[i]] = {}
        }
        for (var i = 2; i < array.length; i++){
          var line = array[i].split('\t')
          var indice = 0
          var tmp = jQuery.extend(true, {}, headerObj);

          for (var h in headerObj){
            tmp[h] = line[indice]
            indice ++
          }
          obj.push(tmp)
        }
        return obj
      }
  }
  }).directive('onReadFile', function ($parse) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
      element.on('change', function(onChangeEvent) {
        var reader = new FileReader();
                
        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {$fileContent:onLoadEvent.target.result});
          });
        };
        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
});
