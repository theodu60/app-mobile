angular.module('starter.controllers', ['$cordovaFile'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

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
