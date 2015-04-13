React = require('react');

var Home = React.createClass({
	render: function() {
		return (
      <a className="avatar-window" href="mailto:me@dannyhertz.com">
        <img className="avatar" src="/images/danny.jpg"></img>
      </a>
		);
	}
});

module.exports = Home;
