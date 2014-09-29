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
    owner: {
      type: 'string'
    },
    attachment: {
      type: 'array'
      // [{id: 'string', type: 'finalInput'}, ... ]
    }
  }
};

