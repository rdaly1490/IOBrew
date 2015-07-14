var oweModel = require('../models/owe').Owe; 
var achievementModel = require('../models/achievements').Achievement; 
var mongoose = require('mongoose');

exports.TotalIou = function(req, res, next) {

	oweModel.find({finished: 1, owerid: username}, function(err, iobrews) {
		var totalIous = iobrews.length;
		res.send(totalIous);
		console.log(totalIous);
		next();
	});	
};

exports.FirstIou = function(req, res, next) {

	var username = req.body.owerid;

	oweModel.find({finished: 1, owerid: username}, function(err, iobrews) {
		console.log("Got about this many ious: "+iobrews.length);
		var first = (iobrews.length > 0)
		if(first) {
			var testModel = new achievementModel({
				username: username,
				type: "First IOU"
			});
			testModel.save(function(err){
				console.log(err);
			});
			next();
			console.log("First IOU complete");
		} else {
			console.log("False");
			next();
		}
	});	
};

exports.FirstUome = function(req, res, next) {

	var username = req.body.owedid;

	if(username.indexOf("@") !== -1) {
		oweModel.find({finished: 1, owedid: username}, function(err, iobrews) {
			var first = (iobrews.length > 0)
			if(first) {
				var testModel = new achievementModel({
					username: username,
					type: "First UOME"
				});
				testModel.save(function(err){
					console.log(err);
				});
				next();
				console.log("First UOME complete");
			} else {
				console.log("False");
				next();
			}
		});
	}
};

exports.TenIou = function(req, res, next) {

	var username = req.body.owerid;

	if(username.indexOf("@") !== -1) {
		oweModel.find({finished: 1, owerid: username}, function(err, iobrews) {
			var first = (iobrews.length > 9)
			if(first) {
				var testModel = new achievementModel({
					username: username,
					type: "Ten IOU"
				});
				testModel.save(function(err){
					console.log(err);
				});
				next();
				console.log("Ten IOU complete");
			} else {
				console.log("False");
				next();
			}
		});
	}
};

exports.TenUome = function(req, res, next) {

	var username = req.body.owedid;

	if(username.indexOf("@") !== -1) {
		oweModel.find({finished: 1, owedid: username}, function(err, iobrews) {
			var first = (iobrews.length > 9)
			if(first) {
				var testModel = new achievementModel({
					username: username,
					type: "Ten UOME"
				});
				testModel.save(function(err){
					console.log(err);
				});
				next();
				console.log("Ten UOME complete");
			} else {
				console.log("False");
				next();
			}
		});
	}
};

exports.FiftyIou = function(req, res, next) {

	var username = req.body.owerid;

	if(username.indexOf("@") !== -1) {
		oweModel.find({finished: 1, owerid: username}, function(err, iobrews) {
			var first = (iobrews.length > 49)
			if(first) {
				var testModel = new achievementModel({
					username: username,
					type: "Fifty IOU"
				});
				testModel.save(function(err){
					console.log(err);
				});
				next();
				console.log("Fifty IOU complete");
			} else {
				console.log("False");
				next();
			}
		});
	}
};

exports.FiftyUome = function(req, res) {

	var username = req.body.owedid;

	if(username.indexOf("@") !== -1) {
		oweModel.find({finished: 1, owedid: username}, function(err, iobrews) {
			var first = (iobrews.length > 49)
			if(first) {
				var testModel = new achievementModel({
					username: username,
					type: "Fifty UOME"
				});
				testModel.save(function(err){
					console.log(err);
				});
				console.log("Fifty UOME complete");
			} else {
				console.log("False");
			}
		});
	}
};