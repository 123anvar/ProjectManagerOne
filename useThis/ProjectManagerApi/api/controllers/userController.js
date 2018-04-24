'use strict';


var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  dbResponse = { status: [{ Result: false, Message: '' }] };



exports.listUsers = function (req, res) {
  User.find({}, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.updateUser = function (req, res) {
  var newUser = new User(req.body);
  var existingUser = true;  
  console.log(req.body.Employee_ID );
  User.find({ Employee_ID: req.body.Employee_ID }, function (err, user) {
    // if (existingUser) {
    //   existingUser = false;      
    // }
    // else {
    //   existingUser = true;
    // }
    console.log(existingUser);
  });
  console.log(existingUser);
  console.log(req.body);
  
  if (existingUser) {
    User.findOneAndUpdate({ Employee_ID: req.params.Employee_ID }, req.body, { new: true }, function (err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  }
  else {
    newUser.save(function (err, user) {
      if (err) {
        dbResponse.status = {
          Result: 'false',
          Message: 'User Addition failed'
        };
        res.json(dbResponse);
        //res.send(err);
      }
      else {
        dbResponse.status = {
          Result: true,
          Message: 'User Added Successfully'
        };
        res.json(dbResponse);
        //res.send(user);
      }
    });
  }
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

