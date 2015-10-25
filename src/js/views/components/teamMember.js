import React from "react";

let TeamMember = React.createClass({

  render: function() {
    return (
      <div key={this.props.name} className="member col-sm-4 col-md-4 col-lg-3">
        <img className="img-responsive member" src={"./public/images/team/" + this.props.photo } />
        <h2>{this.props.name}</h2>
        <h3>{this.props.title}</h3>
      </div>
    )
  }
});

export default TeamMember;
