/**
 * SolutionController
 *
 * @description :: Server-side logic for managing solutions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  definition: function(req, res) {
    res.json(Document.definition);
  },
  
  index: function(req, res) {
    res.badRequest();
  },
  
  list: function(req, res) {
    if( User.isJudge( req.usr ) ) {
      // List all
    } else {
      // List "yours"
    }
  },
  
  submit:  function (req, res) {
    var params = req.allParams();
    var usrID = req.usr !== undefined ? req.usr.id : 0;
    var jsdiff = require('diff');
    
    sails.log.debug("let's see \n", params);
    
    Document.create({
      title: 'code_by_' + usrID ,
      type: 'code',
      content: params.code,
      owner: usrID
    }).exec(function(err, doc){
      if (err) sails.log.err('Oops, something went wrong', err);
    });
    
    Document.findOne({
      id: params.problemID
    }).exec(function(err, problemDoc){
      if (err) res.negotiate(err);
      
      var spectedOutput = problemDoc.attachment.length > 1 ? problemDoc.attachment[1].content : ""
          , diff = jsdiff.diffLines(spectedOutput, params.output.trim())
          , ok = true;
      
      sails.log.debug("Spected: \n", spectedOutput);
      sails.log.debug("Submited: \n", params.output);
            
      diff.forEach(function(part){
        // green for additions, red for deletions
        // grey for common parts
        sails.log.debug("Part added: ", part.added);
        sails.log.debug("Part removed: ", part.removed);
        sails.log.debug("Part content: ", part.value);
        
        if(part.added || part.removed) {
          ok = false;
          return false;
        }
        
      });
      
      sails.log.debug('problem submition, sucess: ', ok);
      
      if( ok ) {
        // write new Document (with status "sucess")
        // update score
        // respond "success"
      } else {
        // write new Document (with status "failed")
        // update score
        // respond "failed"
      }
    });
  }

};

