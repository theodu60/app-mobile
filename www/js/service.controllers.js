angular.module('app')
  .factory('outils', function($cordovaFile, $localStorage) {
    return {
      /*
      	Parametres: String
      	retour: JSON
      */
      parsing: function(str) {
        var array = str.split('\r\n')
        var name = array[0]
        var header = array[1].split('\t')
        var tmp = {}
        var obj = []

        for (var i = 2; i < array.length; i++){
          var line = array[i].split('\t')
          var headerObj = {}
          for (var y in header){
            headerObj[header[y]] = line[y]
          }
          obj.push(headerObj)


        }
        return obj
      },
      /*
        Parametres: str
        retour: RIEN
      */
      addListHis: function(str) {
        if (!$localStorage.listHis){
          $localStorage.listHis = []
        }
        var date = str.split('\r\n')[2].split('\t')[0].split(' ')[0]

        if ($localStorage.listHis.indexOf(date) > -1) {
        } else {
          $localStorage.listHis.push(date)
        }
        return date
      },
      /*
        Parametres: RIEN
        retour: LIST HIS 
      */
      getListHis: function() {
        return  $localStorage.listHis
      },
       /*
        Parametres: str
        retour: RIEN 
      */
      delListHis: function(str) {
        for (var i in $localStorage.listHis){
          if ($localStorage.listHis[i] == str)
            $localStorage.listHis.splice(i,1)
        }
      },
           
  }
  })
