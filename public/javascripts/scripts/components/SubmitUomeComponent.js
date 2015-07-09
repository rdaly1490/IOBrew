var React = require('react');
var $ = require("jquery");

var OweModel = require("../models/OweModel");

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container-fluid">
				<div className="col-xs-8 col-xs-offset-2">
					<form onSubmit={this.submitUome}>
						<label>This person owes you beer!</label><br />
						<input type="text" ref="name" /><br />
						<label>Image URL</label><br />
						<input type="text" ref="image" /><br />
						<label>Reason</label><br />
						<input type="text" ref="reason" /><br />
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
						<label>Email Reminder in a week?</label><br />
						<input type="radio" ref="reminder" value="true" name="reminder" />&nbsp; Yes<br />	
						<input type="radio" ref="reminder" value="false" name="reminder" />&nbsp; No<br />																		
						<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		);
	},
	submitUome: function(e) {
		e.preventDefault();

		var rem = false;
		if ($("input[name=reminder]:checked").val() === "true") {
			rem=true;
		}

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


		if (owe.attributes.image.length < 5) {
			owe.attributes.image = "http://i.imgur.com/AwSWCaG.jpg"
		}

		owe.save();

		this.props.myRouter.navigate("userdash", {trigger: true});
	}
});