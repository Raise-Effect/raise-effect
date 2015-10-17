import React from "react";
import Nav from "./views/components/nav";

let App = React.createClass({
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