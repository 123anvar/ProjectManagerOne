var express = require('express'),
app = express(),
cors = require('cors'),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
User = require('./api/models/userModel'), //created model loading here
bodyParser = require('body-parser');
app.use(cors());

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/projectManagerDB',{ useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/projectManagerDB'); 





app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/userRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('project manager API server started on: ' + port);