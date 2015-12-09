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
  }).directive('fileReader', function(outils) {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, element) {
      $(element).on('change', function(changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              var contents = e.target.result;
              scope.$apply(function () {
                scope.fileReader = contents;
                console.log(outils.parsing(contents))
              });
          };
          
          r.readAsText(files[0]);


        }
      });
    }
  };
});




