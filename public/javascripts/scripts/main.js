var React = require('react');
var Backbone = require("backbone");
Backbone.$ = require('jquery');

var WorkoutListComponent = require("./components/WorkoutListComponent");
var SubmitComponent = require("./components/SubmitComponent");
var RegisterComponent = require("./components/RegisterComponent");
var SubmitIouComponent = require("./components/SubmitIouComponent");
var SubmitUomeComponent = require("./components/SubmitUomeComponent");

var App = Backbone.Router.extend({
	routes: {
		"": "home",
		"workoutlist":"home",
		"submit":"submit",
		"register": "register",
		"submitiou": "submitIou",
		"submituome": "submitUome"
	},
	home: function() {
		React.render(
			<WorkoutListComponent myRouter={myRouter}/>,
			document.getElementById("container"));
	},
	submit: function() {
		React.render(
			<SubmitComponent myRouter={myRouter}/>,
			document.getElementById("container"));
	},
	register: function() {
		React.render(		
			<RegisterComponent myRouter={myRouter}/>,
			document.getElementById("container"));		
	},
	submitIou: function() {
		React.render(		
			<SubmitIouComponent myRouter={myRouter}/>,
			document.getElementById("container"));			
	},
	submitUome: function() {
		React.render(		
			<SubmitUomeComponent myRouter={myRouter}/>,
			document.getElementById("container"));			
	}

});

var myRouter = new App();
Backbone.history.start();