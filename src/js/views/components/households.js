import React from 'react';
import FamilyTypeBreakdown from '../components/familyTypeBreakdown';
import _ from "lodash";

let Households = React.createClass({
  getFamilyCodeData: function(familyCode) {
    return _.find(this.props.data, (item) => item.familyCode == familyCode);
  },
  getFamilyBreakdown: function() {
    if (_.isEmpty(this.props.data)) {
      return (
        <div>No data. Please change your county</div>
      )
    }
    return _.map(this.props.groups, (group) => {
      var familyCodeData = this.getFamilyCodeData(group.familyCode);
      
      if (!familyCodeData) return null;

      var percentage = Math.round((this.props.annualWage / Math.ceil(familyCodeData.annual)) * 100)
      return (
        <FamilyTypeBreakdown 
          key={group.familyCode}
          percentage={percentage}
          name={group.name}
          makeupPercentage={20}
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
