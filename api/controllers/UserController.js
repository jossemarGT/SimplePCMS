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
    return res.json({
      todo: 'login() is not implemented yet!'
    });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    return res.json({
      todo: 'logout() is not implemented yet!'
    });
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    return res.json({
      todo: 'signup() is not implemented yet!'
    });
  }
    ,
    definition: function(req, res) {
        res.json(User.definition);
    }

};

