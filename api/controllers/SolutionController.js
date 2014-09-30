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
    
    // We have problemID
    
    sails.log("amm... params? ", params);
    
    res.ok({'status': 'success'});
  }

};

