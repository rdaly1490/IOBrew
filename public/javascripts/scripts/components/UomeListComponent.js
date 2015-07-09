var React = require('react');
var $ = require("jquery");
var moment = require('moment');

// var UomeCollection = require("../collections/UomeCollection");
var OweCollection = require("../collections/OweCollection");

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var OweHistory = new OweCollection();
		OweHistory.fetch({
			data: {
					filter:
					 {	
					 	type: 2,
					 	finished: 0, //0 or 1 for binary T or F
					 	owedid: this.props.ioBrewUser.get("username")
					 } 
				  },
			success: function() {
				that.forceUpdate();
			}
		});
		OweHistory.on("sync", function() {
			that.forceUpdate();
		});

		return {
			oweHistory: OweHistory
		}
	},
	render: function() {

		var that = this;

		if (this.state.oweHistory.length === 0) {
			var wlist = <div><h3>No UOMEs</h3></div>
		}
		else {
			var wlist = this.state.oweHistory.map(function(model) {
				return (
					<div className="each-iou" key={model.cid}>
						<img onClick={that.completeItem(model)} className="unchecked" src="/images/empty-circle.png" />
						&nbsp; {moment(model.get("date_created")).calendar()} &nbsp;
						<b>{model.get("owername")}</b>
						&nbsp; Owes &nbsp;
						<b>You</b> &nbsp;
						a {model.get("category")}
					</div>
				);
			});
		}

		return (
			<div className="container-fluid">
				<div className="col-xs-8 col-xs-offset-2">
					{wlist}
				</div>
			<button onClick={this.updatePage}>Update Page</button>
			</div>
		);
	},
	completeItem: function(model) {
		return function(e) {
			e.preventDefault();
			var target = $(e.target);

			model.set({
				finished: !(model.get("finished"))
			});

			model.save();

			if (model.get("finished") === true) {
				e.target.src="/images/beer-icon.png";
				target.parent().addClass("checked");
			}
			else {
				e.target.src="/images/empty-circle.png";
				target.parent().removeClass("checked");
			}
		}
	},
	updatePage: function(e) {
		window.location.reload();
	}
});