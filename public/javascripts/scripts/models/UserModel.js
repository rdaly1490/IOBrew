var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
	defaults: {
		username: null,
		password: null,
		firstName: null,
		lastName: null,
		email: null,
		date_created:null
	},
	urlRoot:"/users",
	idAttribute: "_id"
});