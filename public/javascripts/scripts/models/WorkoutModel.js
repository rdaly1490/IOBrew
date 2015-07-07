var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
	defaults: {
		name:null,
		description:null,
		date_created:null
	},
	urlRoot:"/workouts",
	idAttribute: "_id"
});