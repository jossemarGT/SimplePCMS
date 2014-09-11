/**
* res.login([inputs])
*
* @param {String} inputs.username
* @param {String} inputs.password
*
* @description :: Log the requesting user in using a passport strategy
*/
module.exports = function login(inputs) {
  inputs = inputs || {};
  
  var req = this.req;
  var res = this.res;
  
  User.attemptLogin({
    email: inputs.username,
    password: inputs.password
  }, function (err, user) {
    if (err) return res.negotiate(err);
    if (!user) {
      return res.badRequest('Invalid username/password combination.');
    }
    
    // TODO: Change the auth method (like jwt)
    req.session.me = user.id;
    req.session.rol = user.rol;
    return res.ok();
  });
};