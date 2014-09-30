/**
 * DocumentController
 *
 * @description :: Server-side logic for managing documents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  
  /**
   * Give the (Model) object definition to the frontend
   */
  definition: function(req, res) {
    res.json(Document.definition);
  },
  
  /**
   * Change the default behavioar of "index"
   */
  
  index: function(req, res) {
    Document.find({
      '$or' : [
        {'type': 'page'},
        {'type': 'problem'}
      ]
      }).exec(function(err, data) {
        if (err) res.negotiate(err);
        res.json(data);
    });
  }
};

