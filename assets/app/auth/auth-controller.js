(function(ng, _) {

    'use strict';

    ng.module('SimplePCMS')
        .controller('AuthCtrl', AuthCtrl)

    function AuthCtrl($scope, $state, Auths, AuthDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('auths'.toLowerCase());
        
        $scope.auths = Auths;
        $scope.model_def = AuthDefinition.originalElement;
        $scope.auth = {};

        $scope.login = function login() {
            auth = auth || $scope.auth;
            if (window.confirm('Are you sure you want to delete this auth?')) {
                return resourceService.remove(auth, $scope.auths);
            }
        };
    }

})(
    window.angular,
    window._
);
