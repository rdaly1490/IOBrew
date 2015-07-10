var oweModel = require('../models/owe').Owe; 
var achievementModel = require('../models/achievements').Achievement; 
var mongoose = require('mongoose');

exports.FirstIou = function(req, res) {

	var username = req.body.owerid;

	oweModel.find({finished: 1, owerid: username}, function(err, iobrews) {
		var first = (iobrews.length > 0)
		if(first) {
			var testModel = new achievementModel({
				username: username,
				type: "First IOU"
			});
			testModel.save(function(err){
				console.log(err);
			});
			console.log("First IOU complete");
		} else {
			console.log("False");
		}
	});	

};

exports.FirstUome = function(req, res) {


};