var Backbone = require('backbone');
Backbone.$ = require('jquery');
var UserModel = require('../models/UserModel');

module.exports = Backbone.Collection.extend({
	model: UserModel,
	url:"http://localhost:3000/users"
});