var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
	defaults: {
		name:null,
		description:null,
		date_created:null
	},
	urlRoot:"http://localhost:3000/workouts",
	idAttribute: "_id"
});