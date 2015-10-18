import React from 'react';
import FamilyTypeBreakdown from '../components/familyTypeBreakdown';
import _ from "lodash";

let Households = React.createClass({
  getDefaultProps: function() {
    return {
      data: {},
      population: {},
      sufficieny: {}
    };
  },
  getFamilyBreakdown: function() {
    return _.map(this.props.groups, (group) => {
      return (
        <FamilyTypeBreakdown
          key={group.populationKey}
          name={group.name}
          percentage={this.props.sufficieny[group.populationKey] || 0}
          makeupPercentage={this.props.population[group.populationKey] || 0}
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
