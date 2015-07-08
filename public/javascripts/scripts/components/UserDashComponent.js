var React = require('react');
var $ = require("jquery");

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container-fluid">
				<div className="col-xs-12">
					<div className="col-xs-6 iou">
						<button onClick={this.submitIou}>Submit an IOU!</button><br />
						<div onClick={this.listIous} className="col-xs-10 col-xs-offset-1 well">
							<div className="col-xs-10 col-xs-offset-1">
							Click Me to see List!
							</div>
							Lorem ipsum Eiusmod deserunt magna aute do incididunt eiusmod officia. Lorem ipsum Dolor Ut aliqua consequat pariatur occaecat. Lorem ipsum Ea Excepteur aute cupidatat minim pariatur Ut eu aliquip voluptate in. Lorem ipsum Culpa tempor aliqua nostrud amet non.
						</div>
					</div>
					<div className="col-xs-6 uome">
						<button onClick={this.submitUome}>Submit a UOME!</button><br />
						<div onClick={this.listUomes} className="col-xs-10 col-xs-offset-1 well">
							<div className="col-xs-10 col-xs-offset-1">
							Click Me to see List!
							</div>
							Lorem ipsum Eiusmod deserunt magna aute do incididunt eiusmod officia. Lorem ipsum Dolor Ut aliqua consequat pariatur occaecat. Lorem ipsum Ea Excepteur aute cupidatat minim pariatur Ut eu aliquip voluptate in. Lorem ipsum Culpa tempor aliqua nostrud amet non.
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