'use strict';
module.exports = function(app) {
  var project = require('../controllers/projectController');

  // add,view,update and delete projects
  app.route('/project')
    .get(project.listProjects)
    .post(project.addUpdateProject);

    app.route('/deleteProject')    
    .post(project.deleteProject);    


  app.route('/project/:Project_ID')
    .get(project.readProject)
    .put(project.addUpdateProject)
    .delete(project.deleteProject);
};