var React = require('react');

module.exports = React.createClass({
  componentWillMount: function () {
      this.props.ioBrewUser.on('change', function() {
      this.forceUpdate();
    }, this);
  },
  render: function() {
    var links = [];
    var userDropdown = null;
    if(!this.props.ioBrewUser.get("username")) {
      var logo = (<a className="navbar-brand" href="#"><img src="/images/beer-icon.png" className="img-responsive" alt="Responsive image" /></a>);
      links.push(<li className="nav-links" key="login"><a href="/login">Log in</a></li>);
      links.push(<li className="nav-links" key="register"><a href="/register">Register</a></li>);
    }
    else {
      var logo = (<a className="navbar-brand" href="#userdash"><img src="/images/beer-icon.png" className="img-responsive" alt="Responsive image" /></a>);
      links.push(<li className="nav-links mobile-submit" key="SubmitIou"><a href="#submitiou">Submit IOU</a></li>);
      links.push(<li className="nav-links mobile-submit" key="SubmitUome"><a href="#submituome">Submit UOME</a></li>);
      links.push(<li className="nav-links" key="UserDash"><a href="#userdash">User Dash</a></li>);
      links.push(<li className="nav-links" key="Profile"><a href="#profile">Profile</a></li>);
      links.push(<li className="nav-links" key="logout"><a href="#" onClick={this.onLogOut}>Log out</a></li>);
    }
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid nav-container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="logos nav-justified">
              {logo}
            </div>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              {links}
              {userDropdown}
            </ul>
          </div>
        </div>
      </nav>
    );
  },

  onLogOut: function(e) {
    e.preventDefault();
    window.location.href = "/logout";
  }
});

  // var logo = (<a className="navbar-brand" href="#"><span className="io">io</span><span className="brew">Brew</span><img src="/images/beer-icon.png" className="img-responsive" alt="Responsive image" /></a>);