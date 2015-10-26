import React from "react";
import { Link } from 'react-router';

let Nav = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-raise">
          <div className="container">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navigation" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <div className="navbar-brand">
                    <Link to="/"><img src="/public/images/logo.png"/></Link>
                  </div>
                  <div className="navbar-text">
                    RAiSE EffECT
                  </div>

              </div>

              <div className="collapse navbar-collapse" id="main-navigation">
                  <ul className="nav navbar-nav navbar-right">
                      <li><Link to="/about">Study</Link></li>
                      <li><Link to="/discussion">Discussion</Link></li>
                      <li><Link to="/data">Data Deep Dive</Link></li>
                      <li><Link to="/team">Team</Link></li>
                  </ul>
              </div>
          </div>
      </nav>
    )
  }
});


export default Nav;
