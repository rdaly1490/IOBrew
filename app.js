var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var workouts = require('./routes/workouts');
var UserRoute = require('./routes/UserRoute');
var IouRoute = require('./routes/IouRoute');
var UomeRoute = require('./routes/UomeRoute');
var mongoose = require('mongoose');
var fs = require("fs");

mongoose.connect('mongodb://localhost/workout_tracker');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if('OPTIONS' == req.method){
    res.sendStatus(200);
  }
  else{
  next();
  }
});

fs.readdirSync(__dirname + "/models").forEach(function(filename) {
  if (~filename.indexOf(".js")) require(__dirname + "/models/" + filename)
});

app.get('/', routes.index);

app.get("/workouts", function(req, res) {
  mongoose.model("workout").find(function(err, workout) {
    res.send(workout);
  })
});

app.get("/users", function(req, res) {
  mongoose.model("user").find(function(err, users) {
    res.send(users);
  })
});

app.get("/ious", function(req, res) {
  mongoose.model("iou").find(function(err, ious) {
    res.send(ious);
  })
});

app.get("/uomes", function(req, res) {
  mongoose.model("uome").find(function(err, uomes) {
    res.send(uomes);
  })
});

app.post('/workouts', workouts.create);

app.post('/users', UserRoute.create);

app.post('/ious', IouRoute.create);

app.post('/uomes', UomeRoute.create);








app.get('/workouts/:id', workouts.show);

app.put('/workouts', workouts.update);

app.delete('/workouts', workouts.delete);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


