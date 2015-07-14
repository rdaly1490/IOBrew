var React = require('react');
var _ = require("backbone/node_modules/underscore");
var $ = require("jquery");
var validator = require("validator");

var OweModel = require("../models/OweModel");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors: {}
		}
	},
	render: function() {
		return (
			<div className="container-fluid submit-container">
				<div className="col-xs-8 col-xs-offset-2 form">
					<form onSubmit={this.submitUome}>
						<label>This person owes you beer!</label><br />
						<input type="text" ref="name" placeholder="Enter username or regular name" /><br />
						<p className="error">{this.state.errors.name}</p>
						<p className="error">{this.state.errors.noUser}</p>
						<label>Image URL</label><br />
						<input type="text" ref="image" /><br />
						<p className="error">{this.state.errors.image}</p>
						<label>Reason</label><br />
						<textarea ref="reason"></textarea><br />
						<p className="error">{this.state.errors.reason}</p>
						<label>Category</label><br />
						<select ref="category">
							<option value=""> -- Select a Beer Category -- </option>
							<option value="Single Beer">Single Beer</option>
							<option value="Six Pack">6 Pack</option>
							<option value="Twelve Pack">12 Pack</option>
							<option value="Twenty-Four Pack">24 Pack</option>
							<option value="30 Rack">30 Rack</option>
							<option value="Keg">Keg</option>
						</select><br />
						<p className="error">{this.state.errors.category}</p>
						<label>Email Reminder in a week?</label><br />
						<input type="radio" value="true" name="reminder" />&nbsp; Yes<br />	
						<input type="radio" value="false" name="reminder" />&nbsp; No<br />																	
						<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		);
	},
	submitUome: function(e) {
		e.preventDefault();

		var that = this;
		
		var err = {}

		var owed = this.refs.name.getDOMNode().value
		var img = this.refs.image.getDOMNode().value
		var reason = this.refs.reason.getDOMNode().value
		var category = this.refs.category.getDOMNode().value

		if (!owed) {
			err.name = "Field cannot be left blank";
		}
		if (img.length > 1 && !(validator.isURL(img))) {
			err.image = "Must be a valid image link";
		}
		if (!reason) {
			err.reason = "Enter a reason so you don't forget!";
		}
		if (category === "") {
			err.category = "Select a category";
		}

		var rem = false;
		if ($("input[name=reminder]:checked").val() === "true") {
			rem=true;
		}

		this.setState({errors:err});

		if(_.isEmpty(err)) {

			var owe = new OweModel({
				type: 2,
				owerid: this.refs.name.getDOMNode().value,
				owername: this.refs.name.getDOMNode().value,
				owedid: this.props.ioBrewUser.get("username"),
				owedname: this.props.ioBrewUser.get("givenName"),
				createdby: this.props.ioBrewUser.get("username"),
				image: this.refs.image.getDOMNode().value,
				reason: this.refs.reason.getDOMNode().value,
				category: this.refs.category.getDOMNode().value,
				reminder: rem
			});


			if (owe.attributes.image.length < 2) {
				owe.attributes.image = "http://i.imgur.com/AwSWCaG.jpg"
			}

			owe.save(null, {
				success: function(model) {
					that.props.myRouter.navigate("userdash", {trigger: true});
				},
				error: function(model, response) {
					err.noUser = response.responseJSON.message;
					that.setState({errors:err});
				}
			});
		}
	}
});