import React from "react";
import { Link } from 'react-router';

let Nav = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse">
          <div className="container">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navigation" aria-expanded="false">
                  <i className="fa fa-bars"></i>
                  </button>
                  <Link to="/" className="navbar-brand">Raise Effect</Link>
              </div>

              <div className="collapse navbar-collapse" id="main-navigation">
                  <ul className="nav navbar-nav navbar-right">
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/team">Team</Link></li>
                      <li><a href="#">The Data</a></li>
                  </ul>
              </div>
          </div>
      </nav>
    )
  }
});


export default Nav;
