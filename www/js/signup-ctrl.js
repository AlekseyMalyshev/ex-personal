app

.controller('SignupCtrl', function($scope, $state, $http, acctService) {

  var url = {
    authenticate: 'https://agile-garden-3205.herokuapp.com/api/user/register'
  };

  $scope.$on('$ionicView.enter', function(e) {

  });

  $scope.user = {};

  $scope.signup = function(user, passOK) {
    console.log(user, passOK);
    if (passOK) {
      $http.post(url.authenticate, user)
        .then(function(response) {
          acctService.setToken(response.headers('Authenticate'));
          $state.go('tab.dash');
        }, function (err) {
          console.log('Err:', err);
        });
    }
  }

  $scope.signin = function() {
    $state.go('tab.signin');
  }
});
