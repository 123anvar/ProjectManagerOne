'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  dbResponse = { status: [{ Result: false, Message: '' }] };



exports.listTasks = function (req, res) {
  Task.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.readTask = function (req, res) {
  //   task.findById(req.params.taskId, function(err, task) {
  Task.find({ Employee_ID: req.params.Employee_ID }, function (err, task) {
    if (err) {
      res.send(err);
    }
    else {
      if (task.length == 0) { console.log(task.length); }
      res.json(task);
    }
  });
};


exports.addUpdateTask = function (req, res) {  
  delete req.body._id;
  delete req.body.__v;
  Task.findOneAndUpdate({ Employee_ID: req.body.Employee_ID }, req.body, { new: true,upsert :true }, function (err, task) {
    if (err) {
      console.log(err);
      dbResponse.status = {
        Result: false,
        Message: 'Task Addition failed'
      };
      res.json(dbResponse);
      //res.send(err);
    }
    else {
      console.log(task);
      dbResponse.status = {
        Result: true,
        Message: 'Task Added Successfully'
      };
      res.json(dbResponse);
      //res.send(task);
    }
  });
};


exports.deleteTask = function (req, res) {
  Task.remove({
    Employee_ID: req.body.Employee_ID
  }, function (err, task) {
    if (err) {
      console.log(err);
      dbResponse.status = {
        Result: false,
        Message: 'Task deletion failed'
      };
      res.json(dbResponse);
      //res.send(err);
    }
    else {
      console.log(task);
      dbResponse.status = {
        Result: true,
        Message: 'Task deleted Successfully'
      };
      res.json(dbResponse);
      //res.send(task);
    }
  });
};

