(function(ng) {
    
    'use strict';

    ng.module('SimplePCMS')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/documents', '/documents/list');

            $stateProvider
                .state('documents', {
                    abstract: true,
                    url: '/documents',
                    controller: 'DocumentCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        DocumentDefinition : function getDocumentDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('documents');
                        },
                        Documents: function documentsListResolve(Restangular) {
                            return Restangular.all('documents').getList();
                        }
                    },
                })
                .state('documents.list', {
                    url: '/list',
                    templateUrl: 'app/document/document-list.html'
                })
                .state('documents.add', {
                    url: '/add',
                    templateUrl: 'app/document/document-add-edit.html'
                })
                .state('documents.info', {
                    url: '/info/:id',
                    controller: 'SingleDocumentCtrl',
                    templateUrl: 'app/document/document-info.html'
                })
                .state('documents.edit', {
                    url: '/edit/:id',
                    controller: 'SingleDocumentCtrl',
                    templateUrl: 'app/document/document-add-edit.html'
                });
        });
})(
    window.angular
);
