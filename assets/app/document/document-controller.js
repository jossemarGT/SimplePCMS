(function(ng, _) {

  'use strict';

  ng.module('SimplePCMS')
    .controller('DocumentCtrl', DocumentCtrl)
    .controller('SingleDocumentCtrl', SingleDocumentCtrl)
    .controller('SingleProblemCtrl', SingleProblemCtrl);
  
  function DocumentCtrl($scope, $state, Documents, DocumentDefinition, SailsResourceService) {
    var resourceService = new SailsResourceService('documents');
        
    $scope.documents = Documents;
    $scope.model_def = DocumentDefinition.originalElement;
    $scope.document = {attachment: []};
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
              $scope.document = {attachment: []};
              $state.go('^.list');
            }, function(err) {
              console.error('An error occured: ' + err);
            });
    };
      
    $scope.switchFileInput = true;
    $scope.switchFileOutput = true;

    $scope.onReaded = function( e, file, typeString ){
      var index = typeString === 'input' ? 0 : 1;        
      $scope.document.attachment[index] = {'type': typeString, 'content': e.target.result };
      //console.log($scope.document.attachment);
    }
  }

  function SingleDocumentCtrl($scope, $stateParams, Documents, DocumentDefinition) {
    $scope.documentTypes = ['page','problem']; // Eeyup, hardcoded bro /)  

    $scope.document = _.find(Documents, {
      id: $stateParams.id
    });
  }
  
  function SingleProblemCtrl($scope, $stateParams, Documents, Restangular) {
      
    $scope.document = _.find(Documents, {
      id: $stateParams.id
    });
        
    $scope.solution = {};
        
    $scope.readFile = function(e, file, flag) {
      if (flag === 'output'){
        $scope.solution.output = e.target.result;
      } else {
        $scope.solution.code = e.target.result;
      };
    }
    
    $scope.feedback = [
      //{ type: 'info', msg: 'Submit your solution here' }
    ];
    
    $scope.closeAlert = function(index) {
      $scope.feedback.splice(index, 1);
    };
    
    $scope.submitSolution = function(solution) {
      solution = solution || $scope.solution;
      
      if ( ! _.isEmpty( solution ) && !_.isEmpty(solution.output) )
        return $scope.document.post('solution', solution)
        .then(function(data) {
          $scope.feedback.push({type: data.type, msg: data.msg });
        }, function(err){
          console.log("Error while uploading", err);
        });
    }
  }

})(
    window.angular,
    window._
);
