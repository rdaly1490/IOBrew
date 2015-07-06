var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
	defaults: {
		name: null,
		image: "http://i.imgur.com/AwSWCaG.jpg",
		reason: null,
		category: null,
		reminder: false,
		finished: false,
		userId: null,
		date_created: null
	},
	urlRoot:"http://localhost:3000/uomes",
	idAttribute: "_id"
});