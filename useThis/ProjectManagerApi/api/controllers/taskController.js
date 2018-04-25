'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  ParentTask = mongoose.model('ParentTask'),
  dbResponse = { status: [{ Result: false, Message: '' }] };
var rn = require('random-int');


exports.listTasks = function (req, res) {
  Task.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.readTask = function (req, res) {
    //   task.findById(req.params.taskId, function(err, task) {
  Task.find({ Task_ID: req.params.Task_ID }, function (err, task) {
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
  if (req.body.Task_ID === null || req.body.Task_ID.length === 0)
    req.body.Task_ID = rn(10, 999999);
  Task.findOneAndUpdate({ Task_ID: req.body.Task_ID }, req.body, { new: true, upsert: true }, function (err, task) {
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

exports.listParentTasks = function (req, res) {
  ParentTask.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.addUpdateParentTask = function (req, res) {
  delete req.body._id;
  delete req.body.__v;
  if (req.body.Parent_ID === null || req.body.Parent_ID.length === 0)
    req.body.Parent_ID = rn(10, 999999);

  ParentTask.findOneAndUpdate({ Parent_ID: req.body.Parent_ID }, req.body, { new: true, upsert: true }, function (err, parenttask) {
    if (err) {
      console.log(err);
      dbResponse.status = {
        Result: false,
        Message: 'Parent Task Addition failed'
      };
      res.json(dbResponse);
      //res.send(err);
    }
    else {
      console.log(parenttask);
      dbResponse.status = {
        Result: true,
        Message: 'Parent Task Added Successfully'
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

