
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var rn = require('random-int');

var taskSchema = new schema({
  Task_ID: {
    type: Number,
    default: function () { return rn(10, 999999); }
  },
  Parent_ID: {
    type: Number
  },
  Project_ID: {
    type: Number
  },
  User_ID: {
    type: Number
  },
  Parent_Name: {
    type: String
  },
  Project_Name: {
    type: String
  },
  TaskName: {
    type: String,
    required: 'Kindly enter the task name.'
  },
  User_Name: {
    type: String
  },
  Start_Date: {
    type: Date
  },
  End_Date: {
    type: Date
  },
  Priority: {
    type: Number
  },
  Status: {
    type: Boolean
  }
});



var parentTaskSchema = new schema({
  Parent_ID: {
    type: Number    
  },
  Parent_Name: {
    type: String,
    required: 'Kindly enter the parent task name'
  }

});


taskSchema.plugin(uniqueValidator);
module.exports = mongoose.model('ParentTask', parentTaskSchema);
module.exports = mongoose.model('Task', taskSchema);