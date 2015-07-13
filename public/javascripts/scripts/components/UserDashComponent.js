var React = require('react');
var $ = require("jquery");

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container-fluid user-container">
				<h1> Cheers  {this.props.ioBrewUser.get("givenName")}!</h1>
				<div className="col-xs-12 submit-btn">
					<button onClick={this.submitIou}>Submit an IOU!</button>
				</div>
					<div onClick={this.listIous} className="col-xs-12 iou-dash">
						<div className="col-xs-10 col-xs-offset-1">
							<div className="col-xs-10 col-xs-offset-1">
							<h2>Beers You Owe</h2>
							</div>
						</div>
					</div>
				<div className="col-xs-12 submit-btn"> 
					<button onClick={this.submitUome}>Submit a UOME!</button><br />
					<div onClick={this.listUomes} className="col-xs-12 uome-dash">
						<div className="col-xs-10 col-xs-offset-1">
							<div className="col-xs-10 col-xs-offset-1">
							<h2>Beers Owed To You</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
	submitIou: function(e) {
		e.preventDefault();
		this.props.myRouter.navigate("submitiou", {trigger:true});
	},
	submitUome: function(e) {
		e.preventDefault();
		this.props.myRouter.navigate("submituome", {trigger:true});
	},
	listIous: function(e) {
		e.preventDefault();
		this.props.myRouter.navigate("ioulist", {trigger:true});
	},
	listUomes: function(e) {
		e.preventDefault();
		this.props.myRouter.navigate("uomelist", {trigger:true});
	}
});