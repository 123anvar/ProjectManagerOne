'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  dbResponse = { status: [{ Result: false, Message: '' }] };
  var rn = require('random-int');


exports.listUsers = function (req, res) {
  User.find({}, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.readUser = function (req, res) {
  //   User.findById(req.params.userId, function(err, user) {
  User.find({ Employee_ID: req.params.Employee_ID }, function (err, user) {
    if (err) {
      res.send(err);
    }
    else {
      if (user.length == 0) { console.log(user.length); }
      res.json(user);
    }
  });
};


exports.addUpdateUser = function (req, res) {  
  delete req.body._id;
  delete req.body.__v;
  if (req.body.Employee_ID === null || req.body.Employee_ID === 0)
  req.body.Employee_ID = rn(10, 999999);
  User.findOneAndUpdate({ Employee_ID: req.body.Employee_ID }, req.body, { new: true,upsert :true }, function (err, user) {
    if (err) {
      console.log(err);
      dbResponse.status = {
        Result: false,
        Message: 'User Addition failed'
      };
      res.json(dbResponse);
      //res.send(err);
    }
    else {
      console.log(user);
      dbResponse.status = {
        Result: true,
        Message: 'User Added Successfully'
      };
      res.json(dbResponse);
      //res.send(user);
    }
  });
};


exports.deleteUser = function (req, res) {
  User.remove({
    Employee_ID: req.body.Employee_ID
  }, function (err, user) {
    if (err) {
      console.log(err);
      dbResponse.status = {
        Result: false,
        Message: 'User deletion failed'
      };
      res.json(dbResponse);
      //res.send(err);
    }
    else {
      console.log(user);
      dbResponse.status = {
        Result: true,
        Message: 'User deleted Successfully'
      };
      res.json(dbResponse);
      //res.send(user);
    }
  });
};

