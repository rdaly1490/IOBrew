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
			<div className="container-fluid">
				<div className="col-xs-12">
				<h3>User: {this.props.ioBrewUser.get("username")}</h3>
				<p>Member Since: {moment(this.props.ioBrewUser.get("createdAt")).format("MMMM Do YYYY")}</p>


				<h3>Achievements</h3>
				<img className="firstiou" src="/images/empty-circle.png" />
				<p>First IOU Completed!</p>
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