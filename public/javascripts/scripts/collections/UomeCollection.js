var Backbone = require('backbone');
Backbone.$ = require('jquery');
var UomeModel = require('../models/UomeModel');

module.exports = Backbone.Collection.extend({
	model: UomeModel,
	url:"http://localhost:3000/uomes"
});