/**
* Document.js
*
* @description :: A page or programming contest problem
* @docs        :: docs/? 
*/

module.exports = {

  schema: false,
  autoCreatedAt: true,
  autoUpdatedAd: true,
  
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      defaultsTo: 'page'    // page, problem, solution
    },
    content: {
      type: 'text',
      required: true
    },
    status: {
      type: 'string',
      defaultsTo: 'publish'
    },
    owner: {
      type: 'string'
    },
    attachment: {
      type: 'array'
      // [{id: 'string', type: 'finalInput'}, ... ]
    },
    
    // We don't need to spit the solution right?
    toJSON: function() {
      var obj = this.toObject();
      if (obj.type === 'problem' && obj.attachment !== undefined)
        delete obj.attachment[1];
      
      if (obj.originalElement !== undefined)
        delete obj.originalElement;
      
      return obj;
    }
  }
};

