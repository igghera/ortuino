angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $firebaseArray, $timeout) {
  var ref = new Firebase('https://ortuino.firebaseio.com/');

  $scope.moistureValues = $firebaseArray(ref);

  // Convert raw sensor data (1024 to 640) into percentage value for better readability
  $scope.getValue = function() {
    if(!$scope.moistureValues.length) {
      return;
    }

    var lastValue = $scope.moistureValues[$scope.moistureValues.length - 1].value;
    var max = 1023;
    var min = 570;
    var onePercent = (max - min) / 100;
    var percentage = Math.ceil((lastValue - min) / onePercent);

    return Math.abs(parseInt(percentage, 10) - 100);
  };

  $scope.getTime = function() {
    if(!$scope.moistureValues.length) {
      return;
    }

    return $scope.moistureValues[$scope.moistureValues.length - 1].time;
  };

  ref.once('value', function() {
    $timeout(function() {
      var data = $scope.moistureValues.slice($scope.moistureValues.length - 5)
      .map(function(item) {
        return item.value;
      });

      $scope.chartData = {
        labels : ['2 hrs', '1.5 hrs', '1 hr', '30 mins', 'Latest'],
        datasets : [
          {
            fillColor : 'rgba(151,187,205,0)',
            strokeColor : '#f1c40f',
            pointColor : 'rgba(151,187,205,0)',
            pointStrokeColor : '#f1c40f',
            data : data
          }
        ]
      };
    }, 0);
  });

  //Globals
  $scope.options = {
    animation: true,
    responsive: true
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
