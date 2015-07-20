var React = require('react');
var $ = require("jquery");

module.exports = React.createClass({
	render: function() {
		return (
			<div className="col-xs-6 footer-links">
				<a target="_blank" href="https://www.linkedin.com/in/dalyrobert"><img src="/images/beer-linkedin.png" /></a>
				<a target="_blank" href="https://twitter.com/dalywebdev"><img src="/images/beer-twitter.png" /></a>
				<a target="_blank" href="https://github.com/rdaly1490"><img src="/images/beer-github.png" /></a>
			</div>
		);
	}
});