var React = require('react');
var $ = require("jquery");

var UserModel = require("../models/UserModel");

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container-fluid">
				<div className="col-xs-8 col-xs-offset-2">
					<form onSubmit={this.submitWorkout}>
						<label>Username</label><br />
						<input type="text" ref="username" /><br />
						<label>Password</label><br />
						<input type="text" ref="password" /><br />
						<label>First Name</label><br />
						<input type="text" ref="firstName" /><br />
						<label>Last Name</label><br />
						<input type="text" ref="lastName" /><br />
						<label>Email</label><br />
						<input type="text" ref="email" /><br />																		
						<button type="submit">Submit</button>
					</form>
					<button onClick={this.toList}>Back To List</button>
				</div>
			</div>
		);
	},
	submitWorkout: function(e) {
		e.preventDefault();
		var user = new UserModel({
			username: this.refs.username.getDOMNode().value,
			password: this.refs.password.getDOMNode().value,
			first_name: this.refs.firstName.getDOMNode().value,
			last_name: this.refs.lastName.getDOMNode().value,
			email: this.refs.email.getDOMNode().value
		});

		user.save();
	}
});