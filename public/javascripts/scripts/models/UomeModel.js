var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
	defaults: {
		image: "http://i.imgur.com/AwSWCaG.jpg",
		reason: null,
		category: null,
		reminder: false,
		finished: false,
		senderId: null,
		recipientId: null,
		date_created: null
	},
	urlRoot:"/uomes",
	idAttribute: "_id"
});