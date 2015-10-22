import React from "react";

let TeamMember = React.createClass({

  render: function() {
    return (
      <div key={this.props.name} className="col-md-4">
        <div className="member">
          <img className="img-responsive" src={"./public/images/team/" + this.props.photo } />
          <h2>{this.props.name}</h2>
          <h3>{this.props.title}</h3>
        </div>
      </div>
    )
  }
});

export default TeamMember;
