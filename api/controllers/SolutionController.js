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
    var usrNick = req.usr !== undefined ? req.usr.name : 'ghost';
    var jsdiff = require('diff');
    
    sails.log.debug("let's see \n", params);
    
    Document.create({
      title: 'code_by_' + usrID ,
      type: 'code',
      content: params.code,
      owner: usrID
    }).exec(function(err, doc){
      if (err) sails.log.error('Oops, something went wrong', err);
    });
    
    Document.findOne({
      id: params.problemID
    }).exec(function(err, problemDoc){
      if (err) res.negotiate(err);
      
      //TODO: Rewrite this into Model logic (but later)      
      var spectedOutput = problemDoc.attachment.length > 1 ? problemDoc.attachment[1].content : ""
          , diff = jsdiff.diffLines(spectedOutput, params.output.trim())
          , ok = true;
      
      sails.log.debug("Spected: \n", spectedOutput);
      sails.log.debug("Submited: \n", params.output);
            
      ok = diff.every(function(part){
        sails.log.debug("Part added: ", part.added);
        sails.log.debug("Part removed: ", part.removed);
        sails.log.debug("Part content: ", part.value);
        
        return !(part.added || part.removed);
      });
      
      sails.log.debug('problem submition, sucess: ', ok);
      
      if( ok ) {
        //TODO: write new Document (with status "sucess")
        
        Score.findOne({'ownerID': usrID}).exec(function(err, score){
          if (err) res.negotiate(err);
          
          if(_.isEmpty(score)){
            sails.log.debug('score doesn\'t exists. CREATE');
            Score.create({
              'ownerID': usrID,
              'ownerUsername': usrNick,
              'completed': [problemDoc.id],
              'value': problemDoc.score
            }).exec(function(err, score){
              if (err) sails.log.error('[Score] Failed create', err);
              res.ok({'status': 'sucess'});
            });
          } else {
            sails.log.debug('score exists. UPDATE');
            
            Score.native(function(err, collection){
              if (err) sails.log.error('Error with Score.native()', err);
              
              var ObjectID = require('mongodb').ObjectID;
              
              collection.update({'_id': new ObjectID(score.id) },{
                $push : {'completed': problemDoc.id},
                $inc: {'value': problemDoc.score}
              }, {w:1}, function(err, something){
                if (err) sails.log.error('[Score] Failed update', err);
                sails.log.debug(something);
                res.ok({'status': 'sucess'});  
              });
            });
            /*
            Score.update({'id': score.id} , {
              $push : {'completed': problemDoc.id},
              $inc: {'value': problemDoc.score}
            }).exec(function(err, score){
              if (err) sails.log.error('[Score] Failed update', err);
              sails.log.debug("Amm... scores are updated, maybe?");
              res.ok({'status': 'sucess'});
            });
            */
            /*
            if ( !_.contains(score.completed, problemDoc.id) ) {
              
            } else {
              //Cheating!
              res.ok({'status': 'Cheating'});
            }
            */
          }
        });
      } else {
        //TODO: write new Document (with status "failed")
        res.ok({'status': 'failed'});
      }
    });
  }

};

