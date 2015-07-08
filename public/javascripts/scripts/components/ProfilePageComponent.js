var React = require('react');
var $ = require("jquery");
var moment = require('moment');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container-fluid">
				<div className="col-xs-12">
				<h3>User: {this.props.ioBrewUser.get("username")}</h3>
				<p>Member Since: {moment(this.props.ioBrewUser.get("createdAt")).format("MMMM Do YYYY")}</p>


				<h3>Achievements</h3>
				<img src="/images/empty-circle.png" />
				<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
				<img src="/images/empty-circle.png" />
				<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
				<img src="/images/empty-circle.png" />
				<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
				<img src="/images/empty-circle.png" />
				<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
				<img src="/images/empty-circle.png" />
				<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
				<img src="/images/empty-circle.png" />
				<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
				<img src="/images/empty-circle.png" />
				<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>
				<img src="/images/empty-circle.png" />
				<p>Lorem ipsum Nostrud consequat sit ut in dolore irure sint Duis sunt incididunt.</p>

				</div>
			</div>
		);
	}
});