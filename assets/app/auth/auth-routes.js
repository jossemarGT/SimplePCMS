(function(ng) {
    
    'use strict';

    ng.module('SimplePCMS')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/auths', '/auths/list');

            $stateProvider
                .state('auths', {
                    abstract: true,
                    url: '/auths',
                    controller: 'AuthCtrl',
                    template: '<div ui-view></div>',
                })
                .state('auths.login', {
                    url: '/login',
                    templateUrl: 'app/auth/auth-login.html'
                })
            /*
                .state('auths.logout', {
                    url: '/logout'
                });
            */
        });
})(
    window.angular
);
