var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
	defaults: {
		username: null,
		email: null,
		givenName: null,
		surname: null,
		modifiedAt: null,
		createdAt:null,
		status: null,
		emailVerificationToken: null
	}
});