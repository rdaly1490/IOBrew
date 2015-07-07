var React = require('react');
var $ = require("jquery");

var UserModel = require("../models/UserModel");

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container-fluid">
				<div className="col-xs-8 col-xs-offset-2">
					<form onSubmit={this.submitLogin}>
						<label>Username</label><br />
						<input type="text" ref="username" /><br />
						<label>Password</label><br />
						<input type="text" ref="password" /><br />																	
						<button type="submit">Submit</button>
					</form>
					<button onClick={this.toList}>Back To List</button>
				</div>
			</div>
		);
	},
	submitLogin: function(e) {
		e.preventDefault();
		console.log(this.refs.username.getDOMNode().value);
		console.log(this.refs.password.getDOMNode().value);
	}
});