/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/jwtAuth.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "jwtAuth")
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  //'*': true,
  
  UserController: {
    '*': false,
    'login': true,
    'logout': true,
    'definition': true,
    'find': true,
    'update': ['jwtAuth','isTheOwner'],
    'create': ['jwtAuth','isAdmin'],
    'destroy': ['jwtAuth','isAdmin']
  }
};
