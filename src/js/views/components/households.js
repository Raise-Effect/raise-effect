import React from 'react';
import _ from 'lodash';
import FamilyTypeBreakdown from '../components/familyTypeBreakdown';


let Households = React.createClass({
	render() {
		return (
      <div className="">
        <h2>Households</h2>
        <FamilyTypeBreakdown percentage="50" name="Single Adult" makeupPercentage="20"/>
        <FamilyTypeBreakdown percentage="25" name="Two Adults One Child" makeupPercentage="35"/>
        <FamilyTypeBreakdown percentage="10" name="Two Adults Two Children" makeupPercentage="30"/>
      </div>
		);
	}
});

export default Households;
