import React from 'react';
import FamilyTypeBreakdown from '../components/familyTypeBreakdown';
import ProgressBar from '../components/progressBar';
import _ from "lodash";

let Households = React.createClass({
  getDefaultProps: function() {
    return {
      data: {
        geoPercent: 0,
        households: {},
        percents: {},
        totalPercents: {},
        sufficiency: {},
      },
      households: {},
      percentage: {},
      geoPercent: 0
    };
  },
  getFamilyBreakdown: function() {
    return _.map(this.props.groups, (group) => {
      return (
        <FamilyTypeBreakdown
          key={group.populationKey}
          populationKey={group.populationKey}
          name={group.name}
          households={this.props.data.households[group.populationKey] || 0}
          percentage={this.props.data.percents[group.populationKey] || 0}
          totalPercent={this.props.data.totalPercents[group.populationKey] || 0}
          sufficiency={this.props.data.sufficiency[group.populationKey] || 0}
        />
      )
    })
  },
	render() {
		return (
      <div>
        <h2>How Many Households are <a href="">Self-Sufficient</a> at this Wage?</h2>
        <small>
          Our data accounts for the fact that it costs different amounts of money to 
          support children at different ages.
        </small>
        <ProgressBar completed={this.props.data.geoPercent}/>
        <p>{this.props.data.geoPercent}% of households in this region are low income households.</p>
        {
          this.getFamilyBreakdown()
        }
      </div>
		);
	}
});

export default Households;
