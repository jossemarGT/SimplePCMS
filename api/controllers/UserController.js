/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    // Yes res.login() you can check in responses/login.js
    return res.login({
      username: req.param('username'),
      password: req.param('password')
      });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    req.session.me = null;
    
    return res.ok('Bye')
  },

  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    return res.badRequest('Not implemented yet');
  },
  
  definition: function(req, res) {
    res.json(User.definition);
  }

};

