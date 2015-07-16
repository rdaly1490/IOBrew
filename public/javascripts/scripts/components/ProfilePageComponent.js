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
					$(".firstiou").attr("src","/images/beer-icon.png");
					$(".firstiouCompleted").html("Completed:"+" " +moment(model.get("date_created")).format("MMMM Do YYYY"));
				}
				else if (model.get("type") === "First UOME") {
					$(".firstuome").attr("src","/images/green-checkmark.png");
					$(".firstuomeCompleted").html("Completed:"+" " +moment(model.get("date_created")).format("MMMM Do YYYY"));
				}
				else if (model.get("type") === "Ten IOU") {
					$(".teniou").attr("src","/images/retro-beer.jpg");
					$(".teniouCompleted").html("Completed:"+" " +moment(model.get("date_created")).format("MMMM Do YYYY"));
				}
				else if (model.get("type") === "Ten UOME") {
					$(".tenuome").attr("src","/images/green-checkmark.png");
					$(".tenuomeCompleted").html("Completed:"+" " +moment(model.get("date_created")).format("MMMM Do YYYY"));
				}
				else if (model.get("type") === "Fifty IOU") {
					$(".fiftyiou").attr("src","/images/beer-list.png");
					$(".fiftyiouCompleted").html("Completed:"+" " +moment(model.get("date_created")).format("MMMM Do YYYY"));
				}
				else if (model.get("type") === "Fifty UOME") {
					$(".fiftyuome").attr("src","/images/beer-list.png");
					$(".fiftyuomeCompleted").html("Completed:"+" " +moment(model.get("date_created")).format("MMMM Do YYYY"));
				}
			});	
		}
		return (
			<div className="container-fluid profile-container">
				<div className="col-xs-12 user-info">
				<h3>User: {this.props.ioBrewUser.get("username")}</h3>
				<p>Member Since: {moment(this.state.achievementHistory.get("date_created")).format("MMMM Do YYYY")}</p>
				</div>

				<div className="col-xs-10 col-xs-offset-1 achievements">
					<h1>Achievements</h1>
					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<img className="firstiou" src="/images/empty-circle.png" />
						<h3>First IOU Completed!</h3>
						<p className="firstiouCompleted"></p>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<img className="firstuome" src="/images/empty-circle.png" />
						<h3>First UOME Completed</h3>
						<p className="firstuomeCompleted"></p>
					</div>

					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<img className="teniou" src="/images/empty-circle.png" />
						<h3>Ten IOUs Completed!</h3>
						<p className="teniouCompleted"></p>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<img className="tenuome" src="/images/empty-circle.png" />
						<h3>Ten UOMEs Completed</h3>
						<p className="tenuomeCompleted"></p>
					</div>

					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<img className="fiftyiou" src="/images/empty-circle.png" />
						<h3>Fifty IOUs Completed!</h3>
						<p className="fiftyiouCompleted"></p>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<img className="fiftyuome" src="/images/empty-circle.png" />
						<h3>Fifty UOMEs Completed</h3>
						<p className="fiftyuomeCompleted"></p>
					</div>
				</div>
			</div>
		);
	}
});