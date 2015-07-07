var React = require('react');
var Backbone = require("backbone");
Backbone.$ = require('jquery');

var WorkoutListComponent = require("./components/WorkoutListComponent");
var SubmitComponent = require("./components/SubmitComponent");
var RegisterComponent = require("./components/RegisterComponent");
var SubmitIouComponent = require("./components/SubmitIouComponent");
var SubmitUomeComponent = require("./components/SubmitUomeComponent");
var LoginComponent = require("./components/LoginComponent");
var HomePageComponent = require("./components/HomePageComponent");
var NavbarComponent = require("./components/NavbarComponent");

var ioBrewUserModel = require("./models/ioBrewUserModel");

var ioBrewUser = new ioBrewUserModel({
		username: window.iobrew_user.username,
		email: window.iobrew_user.email,
		givenName: window.iobrew_user.givenName,
		surname: window.iobrew_user.surname,
		modifiedAt: window.iobrew_user.modifiedAt,
		createdAt:window.iobrew_user.createdAt,
		status: window.iobrew_user.status,
		emailVerificationToken: window.iobrew_user.emailVerificationToken
});

console.log(ioBrewUser);

// React.render(<NavbarComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />, document.getElementById("nav"));

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
			<HomePageComponent myRouter={myRouter}/>,
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

React.render(<NavbarComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />, document.getElementById("nav"));

if (ioBrewUser.attributes.username !== null) {
	myRouter.navigate("submitiou", {trigger:true});
}



