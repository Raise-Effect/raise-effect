import React from "react";
import {findDOMNode} from "react-dom";
import classNames from "classnames";

let SufficiencyBarLine = React.createClass({
  propTypes: {

  },

  getDefaultProps: function() {
    return { percentage: 0};
  },

  render: function() {
    return (
      <div className={this.props.familyType + "-chart"}></div>
    )
  },

  componentDidMount: function() {
    let chart = nv.models.bulletChart();

    let dataWithLabels = [{
      "title":"Revenue",
      "subtitle":"US$, in thousands",
      "ranges":[150,225,300],
      "measures":[220],
      "markers":[250, 100],
      "markerLabels":['Target Inventory', 'Low Inventory'],
      "rangeLabels":['Maximum Inventory','Average Inventory','Minimum Inventory'],
      "measureLabels":['Current Inventory']
    }];

    let chartName = "." + this.props.familyType + "-chart";

    let vis2 = d3.select(chartName).selectAll("svg")
      .data(dataWithLabels)
      .enter().append('svg')
      .attr('class',"bullet nvd3")
      .transition().duration(1000)
      .call(chart);
  }
});

export default SufficiencyBarLine;
