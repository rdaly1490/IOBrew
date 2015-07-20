var React = require('react');
var $ = require("jquery");

var AchievementCollection = require("../collections/AchievementCollection");
var OweCollection = require("../collections/OweCollection");

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var AchievementHistory = new AchievementCollection();
		var OweHistory = new OweCollection();
		var UomeHistory = new OweCollection();
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
		OweHistory.fetch({
			data: {
					filter:
					 {	
					 	// type: 1, //shouldnt need type because of owerid being the user.  in type 2 ower id is other party
					 	finished: 0, //0 or 1 for binary T or F
					 	owerid: this.props.ioBrewUser.get("username")
					 } 
				  },
			success: function() {
				that.forceUpdate();
			}
		});
		UomeHistory.fetch({
			data: {
					filter:
					 {	
					 	// type: 1, //shouldnt need type because of owerid being the user.  in type 2 ower id is other party
					 	finished: 0, //0 or 1 for binary T or F
					 	owedid: this.props.ioBrewUser.get("username")
					 } 
				  },
			success: function() {
				that.forceUpdate();
			}
		});
		UomeHistory.on("sync", function() {
			that.forceUpdate();
		});
		OweHistory.on("sync", function() {
			that.forceUpdate();
		});
		AchievementHistory.on("sync", function() {
			that.forceUpdate();
		});

		return {
			achievementHistory: AchievementHistory,
			oweHistory: OweHistory,
			uomeHistory: UomeHistory
		}
	},
	render: function() {
		return (
			<div className="container-fluid user-container">
				<div className="col-xs-12 dash-greet">
					<h3>Cheers, {this.props.ioBrewUser.get("givenName")}!</h3>
				</div>
				<a href="#ioulist" className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-md-5 col-md-offset-1 iou-dash">
					<img src="/images/happy.png" className="img-responsive dash-imgs" alt="Responsive image" />
					<h1>{this.state.oweHistory.length}</h1>
					<h4> Active IOUs </h4>
				</a>
				<a href="#uomelist" className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-0 col-md-5 uome-dash">
					<img src="/images/cry2.png" className="img-responsive dash-imgs" alt="Responsive image" />
					<h1>{this.state.uomeHistory.length}</h1>
					<h4> Active UOMEs </h4>
				</a>
				<a href="#submitiou" className="col-xs-12 col-sm-4 col-md-3 col-md-offset-1 user-bottom submit-bottom sub-iou">
					<img src="/images/plus.png" className="img-responsive dash-imgs" alt="Responsive image" />
					<h4>Add IOU</h4>
				</a>
				<a href="#profile" className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-0 col-md-4 user-bottom achs">
					<img src="/images/beer-achs.png" className="img-responsive dash-imgs" alt="Responsive image" />
					<h1>{this.state.achievementHistory.length}</h1>
					<h4> of 6 Achievements</h4>
				</a>
				<a href="#submituome" className="col-xs-12 col-sm-4 col-md-3 user-bottom submit-bottom sub-uome">
					<img src="/images/plus.png" className="img-responsive dash-imgs" alt="Responsive image" />
					<h4>Add UOME</h4>
				</a>								
			</div>
		);
	}
});