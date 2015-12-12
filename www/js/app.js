// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.list-item', {
    url: '/list-item',
    views: {
      'tab-dash': {
        templateUrl: 'templates/list-item.html',
        controller: 'ListCtrl'
      }
    }
  })
  .state('tab.edit-item', {
    url: '/edit-item/:itemId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/list-item.html',
        controller: 'ListCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.view-item', {
      url: '/view-item/:itemId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/view-item.html',
          controller: 'ViewCtrl'
        }
      }
    })

  .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AcctCtrl'
        }
      }
    })
    .state('tab.signin', {
      url: '/signin',
      views: {
        'tab-account': {
          templateUrl: 'templates/signin.html',
          controller: 'SigninCtrl'
        }
      }
    })
    .state('tab.signup', {
      url: '/signup',
      views: {
        'tab-account': {
          templateUrl: 'templates/signup.html',
          controller: 'SignupCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

})

.run(['$rootScope', 'acctService', '$state', function($rootScope, acctService, $state) {

  $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'tab.account') {
        if (!acctService.isAuthenticated()) {
          event.preventDefault();
          $state.go('tab.signin');
        }
      }
      else if (toState.name === 'tab.signin') {
        if (acctService.isAuthenticated()) {
          event.preventDefault();
          $state.go('tab.account');
        }
      }
    });
}]);
