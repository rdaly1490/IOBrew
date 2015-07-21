var React = require('react');
var Backbone = require("backbone");
Backbone.$ = require('jquery');

var RegisterComponent = require("./components/RegisterComponent");
var SubmitIouComponent = require("./components/SubmitIouComponent");
var SubmitUomeComponent = require("./components/SubmitUomeComponent");
var LoginComponent = require("./components/LoginComponent");
var HomePageComponent = require("./components/HomePageComponent");
var NavbarComponent = require("./components/NavbarComponent");
var UserDashComponent = require("./components/UserDashComponent");
var IouListComponent = require("./components/IouListComponent");
var UomeListComponent = require("./components/UomeListComponent");
var ProfilePageComponent = require("./components/ProfilePageComponent");
var IouHistoryComponent = require("./components/IouHistoryComponent");
var UomeHistoryComponent = require("./components/UomeHistoryComponent");
var FooterComponent = require("./components/FooterComponent");

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

var App = Backbone.Router.extend({
	routes: {
		"": "home",
		"submit":"submit",
		"register": "register",
		"submitiou": "submitIou",
		"submituome": "submitUome",
		"userdash": "userdash",
		"ioulist": "ioulist",
		"uomelist": "uomelist",
		"profile": "profile",
		"iouhistory": "iouhistory",
		"uomehistory": "uomehistory"
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
	},
	profile: function() {
		React.render(		
			<ProfilePageComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />,
			document.getElementById("container"));			
	},
	iouhistory: function() {
		React.render(		
			<IouHistoryComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />,
			document.getElementById("container"));			
	},
	uomehistory: function() {
		React.render(		
			<UomeHistoryComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />,
			document.getElementById("container"));			
	}
});

var myRouter = new App();
Backbone.history.start();
Backbone.history.on("all", function() {
	window.scrollTo(0,0);
});

React.render(<NavbarComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />, document.getElementById("nav"));
React.render(<FooterComponent myRouter={myRouter} ioBrewUser={ioBrewUser} />, document.getElementById("footer"));

// if (ioBrewUser.get("username") !== null) {
// 	myRouter.navigate("userdash", {trigger:true});
// }
$('.nav a').on('click', function(){
    $(".navbar-toggle").click() //bootstrap 3.x by Richard
});


