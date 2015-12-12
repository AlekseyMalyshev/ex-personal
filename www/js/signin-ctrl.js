app

.controller('SigninCtrl', function($scope, $state, $http, acctService) {

  var url = {
    authenticate: 'https://agile-garden-3205.herokuapp.com/api/user/authenticate'
  };

  $scope.$on('$ionicView.enter', function(e) {

  });

  $scope.user = {};

  $scope.signin = function(user) {
    $http.post(url.authenticate, user)
      .then(function(response) {
        acctService.setToken(response.headers('Authenticate'));
        $state.go('tab.dash');
      }, function (err) {
        console.log('Err:', err);
      });
  }

  $scope.signup = function() {
    $state.go('tab.signup');
  }
});
