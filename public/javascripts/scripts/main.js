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
var UserDashComponent = require("./components/UserDashComponent");
var IouListComponent = require("./components/IouListComponent");
var UomeListComponent = require("./components/UomeListComponent");

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

// console.log(ioBrewUser);
console.log(window.iobrew_user);

var App = Backbone.Router.extend({
	routes: {
		"": "home",
		"workoutlist":"home",
		"submit":"submit",
		"register": "register",
		"submitiou": "submitIou",
		"submituome": "submitUome",
		"userdash": "userdash",
		"ioulist": "ioulist",
		"uomelist": "uomelist"
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
			<SubmitIouComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />,
			document.getElementById("container"));			
	},
	submitUome: function() {
		React.render(		
			<SubmitUomeComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />,
			document.getElementById("container"));			
	},
	userdash: function() {
		React.render(		
			<UserDashComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />,
			document.getElementById("container"));			
	},
	ioulist: function() {
		React.render(		
			<IouListComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />,
			document.getElementById("container"));			
	},
	uomelist: function() {
		React.render(		
			<UomeListComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />,
			document.getElementById("container"));			
	}
});

var myRouter = new App();
Backbone.history.start();

React.render(<NavbarComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />, document.getElementById("nav"));

// if (ioBrewUser.get("username") !== null) {
// 	myRouter.navigate("userdash", {trigger:true});
// }



