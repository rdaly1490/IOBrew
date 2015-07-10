var Backbone = require('backbone');
Backbone.$ = require('jquery');
var AchievementModel = require('../models/AchievementModel');

module.exports = Backbone.Collection.extend({
	model: AchievementModel,
	url:"/achievements"
});