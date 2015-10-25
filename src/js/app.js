import React from "react";
import Nav from "./views/components/nav";
import Footer from "./views/components/footer";

let App = React.createClass({
  render: function() {
    return (
      <div>
        <Nav />
        <div className="container" id="main-content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
})

export default App;
