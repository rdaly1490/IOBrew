var React = require('react');
var $ = require("jquery");

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<div className="container-fluid home-banner">
					<div className="col-xs-12 banner-text">
						<h1> Connect.</h1>
						<h1 className="alt-text"> Drink. </h1>
						<h1>Share.</h1>
						<p>An innovative IOU App for beers</p>
					</div>
					<div className="col-xs-12 banner-buttons">
						<a className="button primary-button" href="/register">Sign Up</a>
						<a className="button secondary-button" href="/login">Log In</a>
					</div>
				</div>
				<div className="container-fluid home-benefits">
					<div className="col-xs-12">
						<div className="col-xs-10 col-xs-offset-1 col md-12 col-lg-10 col-lg-offset-1 benefits">
							<div className="col-xs-12 col-md-4 col-lg-4">
								<img src="/images/beer-list.png" />
								<h3>Keep Track</h3>
								<p>Never miss out on a cold, refreshing beer again!  IoBrew lets you keep
									track of beer owed to you and beers you owe to others.  Remember to collect
									on those beers and to share the wealth with others.
								</p>
							</div>
							<div className="col-xs-12 col-md-4 col-lg-4">
								<img src="/images/beer-achievements.png" />
								<h3>Achievements</h3>
								<p>Work towards achievements with your friends and prove who buys the most
								beers once and for all.  Think youre always stuck spotting your friends?  At least
								get	some achievements for it.
								</p>
							</div>
							<div className="col-xs-12 col-md-4 col-lg-4">
								<img src="/images/beer-email.png" />
								<h3>Email Reminders</h3>
								<p>Still cant remember to check for beers owed to you or owed to others?  Too busy to log in
									and check?  Well, dont fret, we will send you email reminders if you so choose!
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

						// <div className="col-xs-8 col-xs-offset-2 pic1"></div>
						// <div className="col-xs-8 col-xs-offset-2 well">
						// Lorem ipsum Duis dolore veniam proident velit sint dolor magna eu nisi in.
						// </div>