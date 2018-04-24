'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  // add,view,update and delete users
  app.route('/user')
    .get(user.listUsers)
    .post(user.addUpdateUser);

    app.route('/deleteUser')    
    .post(user.deleteUser);    


  app.route('/user/:Employee_ID')
    .get(user.readUser)
    .put(user.addUpdateUser)
    .delete(user.deleteUser);
};