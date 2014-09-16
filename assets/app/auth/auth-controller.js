(function(ng, _) {
  
  'use strict';

  ng.module('SimplePCMS')
      .controller('AuthCtrl', AuthCtrl)

  function AuthCtrl($scope, $state, $http, $window) {
    $scope.name = {t: 'hello!'};
      
    $scope.pass = {};
    
    $scope.login = function (pass) {
      $http
        .post('/login', pass)
        .success(function (data, status, headers, config) {
          $window.sessionStorage.token = data.token;
          $state.go('home');
        })
        .error(function (data, status, headers, config) {
          delete $window.sessionStorage.token;
          console.log('something went wrong D:');
        
        });
    };
    
  }
  

})(
    window.angular,
    window._
);
