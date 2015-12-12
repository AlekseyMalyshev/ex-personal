app

.controller('ListCtrl', function($scope, $state, $stateParams, $http, acctService) {

  $scope.$on('$ionicView.enter', function(e) {
    if ($stateParams.itemId) {
      $scope.title = 'Edit Item';
      $scope.bottonVal = 'Save Changes';
      acctService.isAuthenticated();
      $http.get('https://agile-garden-3205.herokuapp.com/api/user/item/' + $stateParams.itemId)
        .then(function(response) {
          $scope.item = response.data;
        }, function (err) {
          if (err && err.status === 401) {
            acctService.setToken('');
          }
          console.log('Err:', err);
        });
    }
    else {
      $scope.title = 'List an item';      
      $scope.bottonVal = 'List Item';
    }
  });

  $scope.list = function(item) {
    acctService.isAuthenticated();
    if ($stateParams.itemId) {
      $http.put('https://agile-garden-3205.herokuapp.com/api/user/item', item)
        .then(function(response) {
          $state.go('tab.dash');
        }, function (err) {
          if (err && err.status === 401) {
            acctService.setToken('');
          }
          console.log('Err:', err);
        });
    }
    else {
      $http.post('https://agile-garden-3205.herokuapp.com/api/user/item', item)
        .then(function(response) {
          $state.go('tab.dash');
        }, function (err) {
          if (err && err.status === 401) {
            acctService.setToken('');
          }
          console.log('Err:', err);
        });
    }
  }
});
