
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var rn = require('random-int');

var projectSchema = new schema({
  Project_ID: {
    type: Number
  },
  ProjectName: {
    type: String,
    required: 'Kindly enter the name of the Project'
  },
  Start_Date: {
    type: Date,
    required: 'Kindly enter the start date of the Project'
  },
  End_Date: {
    type: Date,    
    required: 'Kindly enter end date of the Project'    
  },
  Manager_ID: {
    type: Number,
    default: 0
  },
  Priority: {
    type: Number,
    default: 0
  },
  NumberOfTask: {
    type: Number,
    default: 0
  },
  Manager_Name: {
    type: String    
  },
  Status: {
    type: String    
  }
});

projectSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Project', projectSchema);