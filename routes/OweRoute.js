var nodemailer = require('nodemailer');
var emailConfig=require('../stormpath/email');

var oweModel = require('../models/owe').Owe; 

var AchievementFunctions = require('./AchievementFunctions');
// var express = require('express');
// var app = express();
// var stormpath = require('express-stormpath');

// exports.checkUsers = function(req, res, next) {
//   app.get('stormpathApplication').getAccounts({email: "rdaly1490@gmail.com"}, function(err, accounts) {
//     if (accounts) {
//       console.log("This works");
//       next();
//     }
//   });
// }

exports.create = function(req, res) {

//req.body.whatever has to be what the ref is in the component
  var type = req.body.type;
  var image = req.body.image;
  var reason = req.body.reason;
  var category = req.body.category;
  var reminder = req.body.reminder;
  var finished = req.body.finished;
  var owerid = req.body.owerid;
  var owername = req.body.owername;
  var owedid = req.body.owedid;
  var owedname = req.body.owedname;
  var createdby = req.body.createdby;

  var newOwe = new oweModel(); 

    //newIou.property ... The property must equal exactly what's in the model
    newOwe.type = type;
    newOwe.image = image; 
    newOwe.reason = reason; 
    newOwe.category = category;  
    newOwe.reminder = reminder;
    newOwe.finished = finished;
    newOwe.owerid = owerid;
    newOwe.owername = owername;
    newOwe.owedid = owedid;
    newOwe.owedname = owedname;
    newOwe.createdby = createdby;

    console.log(newOwe);

    newOwe.save();

    if(newOwe.reminder === true) {
      setTimeout(function() {
        var transporter = nodemailer.createTransport(emailConfig);
        var message = {
          from: "rdaly1490@gmail.com",
          to: newOwe.createdby,
          subject: "Don't forget about your booze, log back into IoBrew!",
          text: "This is a test email.",
          html: "<p> From: "+" "+newOwe.createdby+"</p> <p> Message: "+" "+newOwe.category+"</p>"
        };
        transporter.sendMail(message, function(error, info) {
          if(error) {
            console.log(error);
            res.send("email error");
          }
          else {
            console.log(info);
            res.send("Email sent!");
          }
        });
      }, 604800000);
    }
};

exports.show = function(req, res) {
  
  var id = req.params.id; // The id of the workout the user wants to look up. 
  oweModel.findById(id, function(err, doc) {
    if(!err && doc) {
      res.status(200).json(doc);
    } else if(err) {
      res.status(500).json({ message: "Error loading IOBrew." + err});
    } else {
      res.status(404).json({ message: "IOBrew not found."});
    }
  });
};

exports.update = function(req, res, next) {
  
  var id = req.params.id; 
  var type = req.body.type;
  var image = req.body.image;
  var reason = req.body.reason;
  var category = req.body.category;
  var reminder = req.body.reminder;
  var finished = req.body.finished;
  var owerid = req.body.owerid;
  var owername = req.body.owername;
  var owedid = req.body.owedid;
  var owedname = req.body.owedname;
  var createdby = req.body.createdby;

  oweModel.findById(id, function(err, doc) {
      if(!err && doc) {
        doc.type = type;
        doc.image = image; 
        doc.reason = reason; 
        doc.category = category;  
        doc.reminder = reminder;
        doc.finished = finished;
        doc.owerid = owerid;
        doc.owername = owername;
        doc.owedid = owedid;
        doc.owedname = owedname;
        doc.createdby = createdby;
        doc.save(function(err) {
          if(!err) {
            res.status(200).json(doc);
            next();
          } else {
            res.status(500).json({message: "Could not update IOBrew. " + err});
          }  
        });
      } else if(!err) {
        res.status(404).json({ message: "Could not find IOBrew."});
      } else {
        res.status(500).json({ message: "Could not update IOBrew." + err});
      }
    }); 
};

exports.delete = function(req, res) {

  var id = req.body.id; 
  oweModel.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.status(200).json({ message: "IOBrew removed."});
    } else if(!err) {
      res.status(404).json({ message: "Could not find IOBrew."});
    } else {
      res.status(403).json({message: "Could not delete IOBrew. " + err });
    }
  });
};