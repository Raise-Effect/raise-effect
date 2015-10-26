import React from "react";
import _ from 'lodash';
import teamData from "../fixtures/teamData.js";
import TeamMember from "./views/components/teamMember.js";
import jQuery from 'jquery';

let Team = React.createClass({
  getInitialState: function() {
    //An unfortunate work around due to a bug in nvd3 that causes a blank tooltip to exist...
    jQuery('.nvtooltip').remove();
    return null;
  },
  render: function() {
    return (
      <div className="team col-md-12">
        <h1>Raise Effect Team</h1>

        <div className="row">
          { _.map(teamData, (member) => {
              return <TeamMember key={member.name} photo={member.photoPath} name={member.name} title={member.title} />
            })
          }
        </div>
      </div>
    )
  }
});

export default Team;
