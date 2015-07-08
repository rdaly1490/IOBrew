var React = require('react');
var $ = require("jquery");

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container-fluid">
				<div className="col-xs-12 logo">
					<h1>io<span className="brew">Brew</span><img src="/images/Beer-icon.png" /></h1>
					<div className="col-xs-10 col-xs-offset-1 test">
						<div className="col-xs-8 col-xs-offset-2 pic1"></div>
						<div className="col-xs-8 col-xs-offset-2 well">
						Lorem ipsum Duis dolore veniam proident velit sint dolor magna eu nisi in.
						</div>



					</div>
				</div>
			</div>
		);
	}
});