import React from "react";
import Nav from "./views/components/nav";
import api from "./api";

let App = React.createClass({
  componentDidMount: function() {
    api.getCounties();
  },
  render: function() {
    return (
      <div>
        <Nav />
        <div className="container" id="main-content">
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default App;