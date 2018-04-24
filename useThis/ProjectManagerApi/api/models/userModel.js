
'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new schema({
  User_ID: {
    type: Number,
    default: 0
  },
  First_Name: {
    type: String,
    required: 'Kindly enter the first name of the User'
  },
  Last_Name: {
    type: String,
    required: 'Kindly enter the last name of the User'
  },
  Employee_ID: {
    type: Number,
    unique:true,
    required: 'Kindly enter employee ID of the User'    
  },
  Project_ID: {
    type: Number,
    default: 0
  },
  taskId: {
    type: Number,
    default: 0
  }
  
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);