var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
	defaults: {
		username: null,
		type: null
	},
	urlRoot:"/achievements",
	idAttribute: "_id"
});