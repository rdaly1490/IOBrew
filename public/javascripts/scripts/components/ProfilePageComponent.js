var React = require('react');
var $ = require("jquery");
var moment = require('moment');

var AchievementCollection = require("../collections/AchievementCollection")

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var AchievementHistory = new AchievementCollection();
		AchievementHistory.fetch({
			data: {
					filter:
					 {	
					 	username: this.props.ioBrewUser.get("username")
					 } 
				  },
			success: function() {
				that.forceUpdate();
			}
		});
		AchievementHistory.on("sync", function() {
			that.forceUpdate();
		});

		return {
			achievementHistory: AchievementHistory
		}
	},
	render: function() {

		if(this.state.achievementHistory.length === 0) {
			console.log("loading");
		}
		else {
			this.state.achievementHistory.map(function(model) {
				if(model.get("type") === "First IOU") {
					$(".firstiou").attr("src","/images/Beer-icon.png");
				}
			});	
		}
		return (
			<div className="container-fluid profile-container">
				<div className="col-xs-12">
				<h3>User: {this.props.ioBrewUser.get("username")}</h3>
				<p>Member Since: {moment(this.state.achievementHistory.get("date_created")).format("MMMM Do YYYY")}</p>
				</div>

				<div className="col-xs-10 col-xs-offset-1 achievements">
					<h3>Achievements</h3>
					<img className="firstiou" src="/images/empty-circle.png" />
					<h5>First IOU Completed!</h5>
					<p>Completed {moment(this.props.ioBrewUser.get("createdAt")).format("MMMM Do YYYY")}</p>
					<img src="/images/empty-circle.png" />
					<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
					<img src="/images/empty-circle.png" />
					<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
					<img src="/images/empty-circle.png" />
					<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
					<img src="/images/empty-circle.png" />
					<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
					<img src="/images/empty-circle.png" />
					<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
					<img src="/images/empty-circle.png" />
					<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
					<img src="/images/empty-circle.png" />
					<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
				</div>
			</div>
		);
	}
});