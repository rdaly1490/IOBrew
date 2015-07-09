var React = require('react');
var $ = require("jquery");
var moment = require('moment');

var IouCollection = require("../collections/IouCollection");

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var IouHistory = new IouCollection();
		IouHistory.fetch({
			data: {filter:
					 {finished: 0} //0 or 1 for true or false (0 is F, 1 is T)
					},
			success: function() {
				that.forceUpdate();
			}
		});
		IouHistory.on("sync", function() {
			that.forceUpdate();
		});

		return {
			iouHistory: IouHistory
		}
	},
	render: function() {

		var that = this;
		var populated;

		if (this.state.iouHistory.length === 0) {
			var wlist = <div></div>
		}
		else {
			var wlist = this.state.iouHistory.map(function(model) {

				if(model.get("senderId") === that.props.ioBrewUser.get("username")) {
					populated = true;
					return (
						<div className="each-iou" key={model.cid}>
							<img onClick={that.completeItem(model)} ref ={model.get("_id")} className="unchecked" src="/images/empty-circle.png" />
							&nbsp; {moment(model.get("date_created")).calendar()} &nbsp;
							<b>You</b>
							&nbsp; Owe &nbsp;
							<b>{model.get("recipientId")}</b> &nbsp;
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
					<h3>No IOUs</h3>
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





