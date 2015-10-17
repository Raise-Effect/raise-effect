import React from 'react';
import FamilyTypeBreakdown from '../components/familyTypeBreakdown';
import _ from "lodash";

let Households = React.createClass({
  getDefaultProps: function() {
    return {
      data: {}
    };
  },
  getPercentage: function(top, value) {
    return Math.ceil( (top / value) * 100 );
  },
  getFamilyBreakdown: function() {
    return _.map(this.props.groups, (group) => {
      return (
        <FamilyTypeBreakdown 
          key={group.populationKey}
          name={group.name}
          percentage={1}
          makeupPercentage={this.getPercentage(this.props.data[group.populationKey], this.props.data.totalHouseHolds)}
        />
      )
    })
  },
	render() {
		return (
      <div>
        <h2>Households</h2>
        {
          this.getFamilyBreakdown()
        }
      </div>
		);
	}
});

export default Households;
