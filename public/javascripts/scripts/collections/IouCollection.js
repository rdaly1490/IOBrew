var Backbone = require('backbone');
Backbone.$ = require('jquery');
var IouModel = require('../models/IouModel');

module.exports = Backbone.Collection.extend({
	model: IouModel,
	url:"/ious"
});