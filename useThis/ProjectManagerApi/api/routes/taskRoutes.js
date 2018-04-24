'use strict';
module.exports = function(app) {
  var user = require('../controllers/taskController');

  // add,view,update and delete users
  app.route('/task')
    .get(user.listTasks)
    .post(user.addUpdateTask);

    app.route('/deletetask')    
    .post(user.deleteTask);    


  app.route('/task/:Task_ID')
    .get(user.readTask)
    .put(user.addUpdateTask)
    .delete(user.deleteTask);
};