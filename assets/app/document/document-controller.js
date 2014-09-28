(function(ng, _) {

    'use strict';

    ng.module('SimplePCMS')
        .controller('DocumentCtrl', DocumentCtrl)
        .controller('SingleDocumentCtrl', SingleDocumentCtrl);
    function DocumentCtrl($scope, $state, Documents, DocumentDefinition, SailsResourceService) {
      var resourceService = new SailsResourceService('documents'.toLowerCase());
        
      $scope.documents = Documents;
      $scope.model_def = DocumentDefinition.originalElement;
      $scope.document = {};
      $scope.documentTypes = ['page','problem']; // Eeyup, hardcoded bro /)      
      $scope.document.type = $scope.documentTypes[0];
      $scope.message = { msg: '', type:'' };

      $scope.remove = function remove(document) {
        document = document || $scope.document;
        if (window.confirm('Are you sure you want to delete this document?')) {
          return resourceService.remove(document, $scope.documents);
        }
      };

      $scope.save = function save(document) {
          document = document || $scope.document;
          return resourceService.save(document, $scope.documents)
              .then(function() {
                  $state.go('^.list');
              }, function(err) {
                  console.error('An error occured: ' + err);
              });
      };
    }

    function SingleDocumentCtrl($scope, $stateParams, Documents, DocumentDefinition) {
      $scope.documentTypes = ['page','problem']; // Eeyup, hardcoded bro /)  

      $scope.document = _.find(Documents, {
        id: $stateParams.id
      });
    }

})(
    window.angular,
    window._
);
