angular.module('app')
    .controller('TestCtrl', function($scope, $ionicPlatform, $cordovaFile) {
        var directory = 'downloads';
        var filename = 'download.mp3';

        $ionicPlatform.ready(function() {})
            .then(function() {
                return $cordovaFile.createDir(directory, false);
            })
            .then(function() {
                return $cordovaFile.createFile(directory + '/' + filename, false);
            })
            .then(function(newFile) {
                return $cordovaFile.downloadFile(url, newFile.nativeURL);
            })
            .then(function(result) {
                // Success!
            }, function(err) {
                // Error
            }, function (progress) {
                // constant progress updates
                console.log('Downloading: '+(progress.loaded/progress.total).toFixed()+'%');
            });
    });

