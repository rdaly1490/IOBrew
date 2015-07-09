var React = require('react');
var $ = require("jquery");
var moment = require('moment');

var IouCollection = require("../collections/IouCollection");

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var IouHistory = new IouCollection();
		IouHistory.fetch({
			data: {
					filter:
					 {	
					 	finished: 0, //0 or 1 for binary T or F
					 	senderId: this.props.ioBrewUser.get("username")
					 } 
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
			var wlist = <div><h3>No IOUs</h3></div>
		}
		else {
			var wlist = this.state.iouHistory.map(function(model) {

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





