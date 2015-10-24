import React from "react";
import {findDOMNode} from "react-dom";
import _ from "lodash";
import d3 from "d3";
import nv from "nvd3";
import SufficiencyBarLine from "../components/sufficiencyBarLine"

let SufficiencyBarChart = React.createClass({
  getDefaultProps: function() {
    return { sufficiency: {}, groups: [] };
  },

  getHeaders: function() {
    return _.map(this.props.groups, (group, i) => {
      return (
        <div key={i} className="horizontal text-right">
          <span key={group.name}>{group.name}</span>
        </div>
      )
    });
  },

  getBars: function() {
    return _.map(this.props.groups, (group) => {
      return (
        <SufficiencyBarLine
          key={group.populationKey}
          familyType={group.populationKey}
          percentage={this.props.sufficiency[group.populationKey]}
        />
      )
    });
  },

  render: function() {
    return (
      <div className="row horizontal rounded">
        <div className="col-xs-12">
            {this.getBars()}
        </div>
     </div>
    );
	}
});

export default SufficiencyBarChart;
