var React = require('react');
var $ = require("jquery");
var moment = require('moment');

var OweModel = require("../models/OweModel");

var OweCollection = require("../collections/OweCollection");

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var OweHistory = new OweCollection();
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
		OweHistory.on("sync", function() {
			that.forceUpdate();
		});

		return {
			oweHistory: OweHistory
		}
	},
	render: function() {
		var detailsStyle = {
			display:"none"
		};
		var that = this;

		var sortedModels = this.state.oweHistory.sortBy(function(oweModel) {
			return (-1*(new Date(oweModel.get("date_created")).getTime()));
		});

		if (sortedModels.length === 0) {
			var wlist = <div className="no-iobrews">
							<img src="/images/empty-list.png" />
							<h3>Theres Nothing Here</h3>
						</div>
		}
		else {
			var wlist = sortedModels.map(function(model) {
				return (
					<div>
						<div className={model.getClass(model)+" "+"each-iou col-xs-12"} key={model.cid}>
							<img onClick={that.completeItem(model)} className="unchecked" src="/images/Beer-icon.png" />
							&nbsp;<b>You</b>
							&nbsp;Owe&nbsp;
							<b>{model.get("owedname")}</b> 
							&nbsp;a {model.get("category")}
							<button onClick={that.showDetails}>Details</button>
							<div className={model.getClass(model)+" "+"details"} style={detailsStyle} key={model.get("_id")}>
								<p>Date Created: {moment(model.get("date_created")).calendar()}</p>
								<p>Created by: {model.get("createdby")}</p>
								<p>Reason: {model.get("reason")}</p>
								<p>Image associated with this item: <a href={model.get("image")}><img src={model.get("image")} /></a></p>
							</div>
						</div>
					</div>
				);
			});
		}

		return (
			<div className="container-fluid list-container">
				<div className="col-xs-10 col-xs-offset-1 todo-list">
					<h2>Beers You Owe</h2>
					{wlist}
				</div>
			<button className="update" onClick={this.updatePage}>Update Page</button>
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
				e.target.src="/images/empty-mug2.png";
				target.parent().addClass("checked");
			}
			else {
				e.target.src="/images/Beer-icon.png";
				target.parent().removeClass("checked");
			}
		}
	},
	updatePage: function(e) {
		window.location.reload();
	},
	showDetails: function(e) {
		e.preventDefault();
		var target = $(e.target);
		target.siblings(".details").toggle();
	}
});




