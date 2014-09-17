/**
 * DocumentController
 *
 * @description :: Server-side logic for managing documents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
    
    definition: function(req, res) {
        res.json(Document.definition);
    }

};

