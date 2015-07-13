var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
	defaults: {
		type: null,
		owerid: null,
		owername: null,
		owedid: null,
		owedname: null,
		createdby: null,
		image: "https://s-media-cache-ak0.pinimg.com/736x/85/98/de/8598de9ad9ae33b00123f07f4fef7a38.jpg",
		reason: null,
		category: null,
		reminder: false,
		finished: false,
		date_created: null
	},
	urlRoot:"/iobrews",
	idAttribute: "_id",
	getClass: function(model) {
		if (model.get("createdby") === window.iobrew_user.username) {
			return "user-submitted";
		}
		else {
			return "friend-submitted";
		}
	}
});