console.log(process.env.NODE_ENV);
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var routes = require('./routes/index');
var workouts = require('./routes/workouts');
var UserRoute = require('./routes/UserRoute');
var IouRoute = require('./routes/IouRoute');
var UomeRoute = require('./routes/UomeRoute');
var OweRoute = require('./routes/OweRoute');
var AchievementRoute = require('./routes/AchievementRoute');
var AchievementFunctions = require('./routes/AchievementFunctions');
var mongoose = require('mongoose');
var fs = require("fs");
var facebook = require("./stormpath/facebook");
var emailConfig=require('./stormpath/email');

var stormpath = require('express-stormpath');

mongoose.connect('mongodb://localhost/workout_tracker');

var app = express();

app.use(stormpath.init(app, {
    apiKeyFile: './stormpath/apiKey.properties',
    application: 'https://api.stormpath.com/v1/applications/56GpvTzerVtKtJEpbpwtvW',
    secretKey: 'robbybobby',
    registrationView: __dirname + '/views/register.jade',
    loginView: __dirname + '/views/login.jade',
    enableForgotPassword: true,
    redirectUrl: '/#userdash',
    enableAutoLogin: true,
    sessionDuration: 1000 * 60 * 60,
    // enableFacebook: true,
    social: {
      facebook: {
        appId: facebook.appId,
        appSecret: facebook.appSecret,
      },
    },
}));

// app.listen(9000);

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
    AchievementFunctions.FirstIou();
    res.send(workout);
  })
});

app.get("/ious", function(req, res) {
  mongoose.model("iou").find(req.query.filter, function(err, ious) {
    res.send(ious);
  })
});

app.get("/uomes", function(req, res) {
  mongoose.model("uome").find(req.query.filter, function(err, uomes) {
    res.send(uomes);
  })
});

app.get("/iobrews", function(req, res) {
  mongoose.model("owe").find(req.query.filter, function(err, owes) {
    console.log(req.query);
    res.send(owes);
  })
});

app.get("/achievements", function(req, res) {
  mongoose.model("achievements").find(req.query.filter, function(err, achievements) {
    console.log(req.query);
    res.send(achievements);
  })
});


app.post('/workouts', workouts.create);

app.post('/users', UserRoute.create);

app.post('/ious', IouRoute.create);

app.post('/uomes', UomeRoute.create);

app.post('/iobrews', function(req,res,next) {
  if(req.body.type === 1 && req.body.owedid.indexOf("@") !== -1) {
    app.get('stormpathApplication').getAccounts({username: req.body.owedid}, function(err, accounts) {
      if (accounts.items.length > 0) {
        res.status(200).json({message: "User Exists"});
        console.log({message: "User found"});
        req.body.owedname = accounts.items[0].givenName;
        next();
      }
      else {
        res.status(404).json({message: "User Not Found"});
        console.log({message: "User Not Found"});
      }
    });
  }
  else if (req.body.type === 2 && req.body.owerid.indexOf("@") !== -1){
    app.get('stormpathApplication').getAccounts({username: req.body.owerid}, function(err, accounts) {
      if (accounts.items.length > 0) {
        res.status(200).json({message: "User Exists"});
        req.body.owername = accounts.items[0].givenName;
        next();
      }
      else {
         res.status(404).json({message: "User Not Found"});
      }
    });
  }
  else {
    res.status(200).json({message: "Not an email address"});
    next();
  }
}, OweRoute.create)

app.post('/achievements', AchievementRoute.create);









app.get('/workouts/:id', workouts.show);

app.get('/uomes/:id', UomeRoute.show);

app.get('/ious/:id', IouRoute.show);

app.get('/iobrews/:id', OweRoute.show);

app.get('/achievements/:id', AchievementRoute.show);




app.put('/workouts', workouts.update);

app.put('/uomes/:id', UomeRoute.update);

app.put('/ious/:id', IouRoute.update);

app.put('/iobrews/:id',OweRoute.update
  ,AchievementFunctions.FirstIou
  ,AchievementFunctions.FirstUome
  ,AchievementFunctions.TenIou
  ,AchievementFunctions.TenUome
  ,AchievementFunctions.FiftyIou
  ,AchievementFunctions.FiftyUome);

app.put('/achievements/:id', AchievementRoute.update);







app.delete('/workouts', workouts.delete);

app.delete('/uomes', UomeRoute.delete);

app.delete('/ious', IouRoute.delete);

app.delete('/iobrews', OweRoute.delete);

app.delete('/achievements', AchievementRoute.delete);


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


