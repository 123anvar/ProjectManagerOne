'use strict';
module.exports = function (app) {
  var task = require('../controllers/taskController');

  // add,view,update and delete tasks
  app.route('/task')
    .get(task.listTasks)
    .post(task.addUpdateTask);


    app.route('/parenttask')
      .get(task.listParentTasks)
      .post(task.addUpdateParentTask);

    app.route('/deletetask')
    .post(task.deleteTask);


  app.route('/task/:Task_ID')
    .get(task.readTask)
    .put(task.addUpdateTask)
    .delete(task.deleteTask);
};