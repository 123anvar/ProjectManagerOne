
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var taskSchema = new schema({
  Task_ID: {
    type: Number,
    default: 0
  },
  First_Name: {
    type: String,
    required: 'Kindly enter the first name of the task'
  },
  Last_Name: {
    type: String,
    required: 'Kindly enter the last name of the task'
  },
  Employee_ID: {
    type: Number,
    unique:true,
    required: 'Kindly enter employee ID of the task'    
  },
  Project_ID: {
    type: Number,
    default: 0
  }
  
  
});

taskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Task', taskSchema);