var React = require('react');
var $ = require("jquery");

var WorkoutModel = require("../models/WorkoutModel");

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container-fluid">
				<div className="col-xs-8 col-xs-offset-2">
					<form onSubmit={this.submitWorkout}>
						<label>WO Name</label><br />
						<input type="text" ref="name" /><br />
						<label>WO Name</label><br />
						<input type="text" ref="description" /><br />
						<button type="submit">Submit</button>
					</form>
					<button onClick={this.toList}>Back To List</button>
				</div>
			</div>
		);
	},
	submitWorkout: function(e) {
		e.preventDefault();
		var workout = new WorkoutModel({
			workout_name: this.refs.name.getDOMNode().value,
			workout_description: this.refs.description.getDOMNode().value
		});

		workout.save();
	},
	toList: function(e) {
		e.preventDefault();
		this.props.myRouter.navigate("workoutlist", {trigger: true});
	}
});