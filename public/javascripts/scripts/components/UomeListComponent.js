var React = require('react');
var $ = require("jquery");
var moment = require('moment');

var UomeCollection = require("../collections/UomeCollection");

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var UomeHistory = new UomeCollection();
		UomeHistory.fetch({
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

				if(model.get("recipientId") === that.props.ioBrewUser.get("username") && model.get("finished") === false) {
					populated = true;
					return (
						<div className="each-iou" id={model.get("_id")} key={model.cid}>
							<img id={model.get("_id")} onClick={that.completeItem(model)} ref ={model.get("_id")} className="unchecked" src="/images/empty-circle.png" />
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
			console.log(model);



		}
		// e.preventDefault();
		// e.target.src="/images/beer-icon.png";
		// var target = $(e.target);
		// var changeStatus = (target).attr("id");

		// target.parent().css("opacity", "0.75");
		// target.parent().css("text-decoration", "line-through");

		// $.ajax({
		// url: '/uomes',
		// type: 'PUT',
		// data: {id: changeStatus, finished: true},
		// });

		// model.set({
		// 	finished: !model.get("finished")
		// });
	},
	updatePage: function(e) {
		window.location.reload();
	}
});