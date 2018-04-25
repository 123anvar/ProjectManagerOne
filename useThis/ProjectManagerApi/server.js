var express = require('express'),
app = express(),
cors = require('cors'),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
User = require('./api/models/userModel'), //created model loading here
Task = require('./api/models/taskModel'),
Project = require('./api/models/projectModel'),
bodyParser = require('body-parser');
app.use(cors());

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/projectManagerDB',{ promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routesOne = require('./api/routes/userRoutes');
var routesTwo = require('./api/routes/taskRoutes');
var routesThree = require('./api/routes/projectRoutes');

routesOne(app); //register the route
routesTwo(app);
routesThree(app);



app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('project manager API server started on: ' + port);