/**
* User.js
*
* @description :: The user model.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {
  
  schema: false,
  
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
    }
    
  },

  beforeCreate : function (inputs, next) {
    User.hashPassword(inputs, next);
  },
  
  beforeUpdate : function (inputs, next) {
    User.hashPassword(inputs, next);
  },
  
  /**
   * Create a new user using the provide inputs,
   * 
   * @param {Object}  inputs
   *                    - username  {String}
   *                    - email     {String}
   *                    - password  {String}
   * @param {Function} next
   */
  signup : function (inputs, next) {
    User.create({
      name: inputs.name,
      username: inputs.email,
      password: inputs.password
    }).exec(next);
  },

  /** 
   * Check validness of a login using the provided inputs.
   *
   * @param {Object} inputs
   *                  + username {String}
   *                  + password {String}
   * @param {Function} next
   */
  attempLogin: function (inputs, next) {
    User.findOne({
      username: inputs.username,
      password: inputs.password
    }).exec(next);
  },
  
  /**
   * Hash your password and exec 
   * 
   * @param {Object}  inputs
   *                    - username  {String}
   *                    - email     {String}
   *                    - password  {String}
   * @param {Function} next
   */
  hashPassword: function (inputs, next) {
    bcrypt.hash(inputs.password, 10, function(err, hash) {
      if(err) return next(err);
      inputs.password = hash;
      next();
    });
  }
};

