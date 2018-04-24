'use strict';


var mongoose = require('mongoose'),
  Project = mongoose.model('Project'),
  dbResponse = { status: [{ Result: false, Message: '' }] };



exports.listProjects = function (req, res) {
  Project.find({}, function (err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.readProject = function (req, res) {
  //   project.findById(req.params.projectId, function(err, project) {
  Project.find({ Employee_ID: req.params.Employee_ID }, function (err, project) {
    if (err) {
      res.send(err);
    }
    else {
      if (project.length == 0) { console.log(project.length); }
      res.json(project);
    }
  });
};


exports.addUpdateProject = function (req, res) {  
  delete req.body._id;
  delete req.body.__v;
  Project.findOneAndUpdate({ Project_ID: req.body.Project_ID }, req.body, { new: true,upsert :true }, function (err, project) {
    if (err) {
      console.log(err);
      dbResponse.status = {
        Result: false,
        Message: 'Project Addition failed'
      };
      res.json(dbResponse);
      //res.send(err);
    }
    else {
      console.log(project);
      dbResponse.status = {
        Result: true,
        Message: 'Project Added Successfully'
      };
      res.json(dbResponse);
      //res.send(project);
    }
  });
};


exports.deleteProject = function (req, res) {
  Project.remove({
    Employee_ID: req.body.Employee_ID
  }, function (err, project) {
    if (err) {
      console.log(err);
      dbResponse.status = {
        Result: false,
        Message: 'Project deletion failed'
      };
      res.json(dbResponse);
      //res.send(err);
    }
    else {
      console.log(project);
      dbResponse.status = {
        Result: true,
        Message: 'Project deleted Successfully'
      };
      res.json(dbResponse);
      //res.send(project);
    }
  });
};

