import React from "react";

let Nav = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse">
          <div className="container">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navigation" aria-expanded="false">
                  <i className="fa fa-bars"></i>
                  </button>
                  <a className="navbar-brand" href="#">Raise Effect</a>
              </div>

              <div className="collapse navbar-collapse" id="main-navigation">
                  <ul className="nav navbar-nav navbar-right">
                      <li><a href="#">About</a></li>
                      <li><a href="#">Team</a></li>
                      <li><a href="#">The Data</a></li>
                  </ul>
              </div>
          </div>
      </nav>
    )
  }
});


export default Nav;