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
    
    sails.log("let's see ", params);
    
    Document.findOne({
      id: params.problemID
    }).exec(function(err, problemDoc){
      if (err) res.negotiate(err);
      
    /*  
      var spectedOutput = problemDoc.attachment !== undefined && problemDoc.attachment.length > 1 ? problemDoc.attachment.content : "";
      
      var diff = jsdiff.diffLines(spectedOutput, params.output);
      */
    });
    
    Document.create({
      title: 'code_by_' + usrID ,
      type: 'code',
      content: params.code,
      owner: usrID
    }).exec(function(err, doc){
      if (err) sails.log.err('Oops, something went wrong', err);
    });
    
    // problemID
    // output
    // code
    
    res.ok({'status': 'success'});
  }

};

