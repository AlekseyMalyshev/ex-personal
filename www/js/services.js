angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('acctService', function($http) {

  this.isAuthenticated = function() {
    var token = localStorage.getItem('token');
    if (token !== null && token !== '') {
      $http.defaults.headers.common['Authenticate'] = token;
      return true;
    }
    else {
      return false;
    }
  };        

  this.setToken = function(token){
    localStorage.setItem('token', token);
  };        

});


