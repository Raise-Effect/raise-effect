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
        <div>
            <h1>This Project was Built by 100% Volunteers</h1>
            <p>
                Hack Oregon is a community-powered non-profit building civic data projects on different themes to promote engagement, awareness, and quality of life.
            </p>
            <p>
                All Hack Oregon projects are open source, built entirely by volunteers from our local community.
                That means that if you live in the Oregon area, or would like to contribute remotely, you can work with us!
            </p>
            <p>
                Although each of our projects require a slightly different blend of talents and resources, our teams are always interdisciplinary and always have roles available
                for people at all levels of experience. We place our team members by balancing the skills they want to contribute with the skill they want to learn — and by operating outside
                of normal bureaucratic, client-based, or venture funded restrictions — we're free to move fast and innovate faster.
            </p>
            <p>
                It's not always easy, but we think it's pretty worth it.
            </p>
            <p>
                Find out more at <a href="hackoregon.org">hackoregon.org</a>
            </p>

            <div className="team col-md-12">
                <h2>Raise Effect Team</h2>

                <div className="row">
                    { _.map(teamData, (member) => {
                      return <TeamMember key={member.name} photo={member.photoPath} name={member.name} title={member.title} />
                    })
                    }
                </div>
            </div>
        </div>
    )
  }
});

export default Team;
