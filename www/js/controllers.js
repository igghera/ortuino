angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $firebaseObject) {
  var ref = new Firebase('https://ortuino.firebaseio.com/');
  // download the data into a local object
  $scope.data = $firebaseObject(ref);

  // Convert raw sensor data (1024 to 640) into percentage value for better readability
  $scope.getValue = function() {
    var max = 1023;
    var min = 570;
    var onePercent = (max - min) / 100;
    var percentage = Math.ceil(($scope.data.value - min) / onePercent);

    return Math.abs(parseInt(percentage, 10) - 100);
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
