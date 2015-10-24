import React from "react";
import { Link } from 'react-router';

let Nav = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-raise">
          <div className="container">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navigation" aria-expanded="false">
                  <i className="fa fa-bars"></i>
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
                      <li><Link to="/about">The Study</Link></li>
                      <li><a href="#">The Discussion</a></li>
                      <li><a href="#">Data Deep Dive</a></li>
                      <li><Link to="/team">The Team</Link></li>
                  </ul>
              </div>
          </div>
      </nav>
    )
  }
});


export default Nav;
