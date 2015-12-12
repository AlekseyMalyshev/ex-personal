app

.controller('AcctCtrl', function($scope, $state, $http, acctService) {

  $scope.$on('$ionicView.enter', function(e) {
    acctService.isAuthenticated();
    $http.get('https://agile-garden-3205.herokuapp.com/api/user/me')
      .then(function(response) {
        console.log(response.data);
        delete response.data.password;
        console.log(response.data);
        $scope.user = response.data;
      }, function (err) {
        if (err && err.status === 401) {
          acctService.setToken('');
        }
        console.log('Err:', err);
      });
  });

  $scope.save = function() {
    acctService.isAuthenticated();
    $http.put('https://agile-garden-3205.herokuapp.com/api/user/me', $scope.user)
      .then(function(response) {
        $scope.user = response.data;
      }, function (err) {
        if (err && err.status === 401) {
          acctService.setToken('');
        }
        console.log('Err:', err);
      });
  }

  $scope.logout = function() {
    acctService.setToken('');
    $state.go('tab.signin');
  }

});
