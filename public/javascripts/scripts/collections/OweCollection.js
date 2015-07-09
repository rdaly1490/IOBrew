var Backbone = require('backbone');
Backbone.$ = require('jquery');
var OweModel = require('../models/OweModel');

module.exports = Backbone.Collection.extend({
	model: OweModel,
	url:"/iobrews"
});