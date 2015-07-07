var Backbone = require('backbone');
Backbone.$ = require('jquery');
var WorkoutModel = require('../models/WorkoutModel');

module.exports = Backbone.Collection.extend({
	model: WorkoutModel,
	url:"/workouts"
});