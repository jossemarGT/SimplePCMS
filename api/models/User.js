/**
* User.js
*
* @description :: The user model.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    rol: {
      type: 'string',
      defaultsTo: 'participant'
    },
  },
  
  login : function () {
  },

  logout : function () {
  },
  
  /**
   * Create a new user using the provide inputs,
   * 
   * @param {Object}  inputs
   *                    - username  {String}
   *                    - email     {String}
   *                    - password  {String}
   */
  signup : function (inputs, next) {
    User.create({
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).exec(next);
  },
  
  beforeCreate : function(inputs, next) {
    bcrypt.hash(inputs.password, 10, function(err, hash) {
      if(err) return next(err);
      inputs.password = hash;
      next();
    });
  },
  
  beforeUpdate : function(inputs, next) {
    bcrypt.hash(inputs.password, 10, function(err, hash) {
      if(err) return next(err);
      inputs.password = hash;
      next();
    });
  }
};

