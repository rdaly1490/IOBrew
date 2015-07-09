var React = require('react');
var $ = require("jquery");
var moment = require('moment');

var UomeModel = require("../models/UomeModel");
var UomeCollection = require("../collections/UomeCollection");

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var UomeHistory = new UomeCollection();
		UomeHistory.fetch({
			data: {filter:
					 {finished: 0} //0 or 1 for true or false (0 is F, 1 is T)
					},
			success: function() {
				that.forceUpdate();
			}
		});
		UomeHistory.on("sync", function() {
			that.forceUpdate();
		});

		return {
			uomeHistory: UomeHistory
		}
	},
	render: function() {

		var that = this;
		var populated;

		if (this.state.uomeHistory.length === 0) {
			var wlist = <div></div>
		}
		else {
			var wlist = this.state.uomeHistory.map(function(model) {

				if(model.get("recipientId") === that.props.ioBrewUser.get("username")) {
					populated = true;
					return (
						<div className="each-iou" key={model.cid}>
							<img onClick={that.completeItem(model)} className="unchecked" src="/images/empty-circle.png" />
							&nbsp; {moment(model.get("date_created")).calendar()} &nbsp;
							<b>{model.get("senderId")}</b>
							&nbsp; Owes &nbsp;
							<b>You</b> &nbsp;
							a {model.get("category")}
						</div>
					);
				}

				else {
					populated = false;
				}
			});
		}

		if (populated === true) {

			return (
				<div className="container-fluid">
					<div className="col-xs-8 col-xs-offset-2">
						{wlist}
					</div>
				<button onClick={this.updatePage}>Update Page</button>
				</div>
			);
		}

		else {
			return (
				<div className="container-fluid">
					<div className="col-xs-8 col-xs-offset-2">
					<h3>No UOMEs</h3>
					</div>
				<button onClick={this.updatePage}>Update Page</button>
				</div>
			);	
		}
	},
	completeItem: function(model) {
		return function(e) {
			e.preventDefault();
			var target = $(e.target);

			console.log(model.id, model.get('finished'));

			model.set({
				finished: !(model.get("finished"))
			});

			console.log(model.id, model.get('finished'));

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