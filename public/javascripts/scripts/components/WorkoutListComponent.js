var React = require('react');
var $ = require("jquery");

var WorkoutCollection = require("../collections/WorkoutCollection");

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var WorkoutHistory = new WorkoutCollection();
		WorkoutHistory.fetch({
			success: function() {
				that.forceUpdate();
			}
		});
		WorkoutHistory.on("sync", function() {
			that.forceUpdate();
		});

		return {
			workoutHistory: WorkoutHistory
		}
	},
	render: function() {

		console.log(this.state.workoutHistory)

		if (this.state.workoutHistory.length === 0) {
			var wlist = <div></div>
		}
		else {
			var wlist = this.state.workoutHistory.map(function(model) {
				return (
					<div key={model.cid}>
					<h3>{model.get("name")}</h3>
					<p>{model.get("description")}</p>
					</div>
				);
			});
		}

		return (
			<div className="container-fluid">
				<div className="col-xs-8 col-xs-offset-2">
				<button onClick={this.submitWO}> Submit new WO</button>
				{wlist}
				</div>
			</div>
		);
	},
	submitWO: function(e) {
		e.preventDefault();
		window.location.href = "http://localhost:3000/login";
	}
});