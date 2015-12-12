var app = angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state, $http, acctService) {

  $scope.$on('$ionicView.enter', function(e) {
    acctService.isAuthenticated();
    $http.get('https://agile-garden-3205.herokuapp.com/api/user/items')
      .then(function(response) {
        $scope.items = response.data;
      }, function (err) {
        if (err && err.status === 401) {
          acctService.setToken('');
        }
        console.log('Err:', err);
      });
  });

  $scope.listItem = function() {
    $state.go('tab.list-item');
  }
})

.controller('ChatsCtrl', function($scope, $http, acctService) {
  $scope.$on('$ionicView.enter', function(e) {
    acctService.isAuthenticated();
    $http.get('https://agile-garden-3205.herokuapp.com/api/user/listings')
      .then(function(response) {
        $scope.items = response.data;
      }, function (err) {
        if (err && err.status === 401) {
          acctService.setToken('');
        }
        console.log('Err:', err);
      });
  });
})

.controller('ViewCtrl', function($scope, $state, $stateParams, $http, acctService) {

  $scope.$on('$ionicView.enter', function(e) {
    acctService.isAuthenticated();
    $http.get('https://agile-garden-3205.herokuapp.com/api/user/item/' + $stateParams.itemId)
      .then(function(response) {
        console.log(response.data);
        $scope.item = response.data;
      }, function (err) {
        if (err && err.status === 401) {
          acctService.setToken('');
        }
        console.log('Err:', err);
      });
  });
});
