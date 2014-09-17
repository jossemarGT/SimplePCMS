/**
 * gossip
 *
 * @module      :: Policy
 * @description :: Just for dev purposes
 * @docs        :: docs/?
 *
 */
module.exports = function(req, res, next) {
  var jwt = require('jwt-simple')
    , token = req.get('Authorization')
    , usr = null;
  
  sails.log('AUTH: ', req.get('Authorization'));
  
  if (token !== undefined) {
    usr = jwt.decode(token, sails.config.globals.jwtSecret, 'HS512');
    sails.log('ID: ', usr.id);
    sails.log('ROL: ', usr.rol);
  }
  
  return next();
};