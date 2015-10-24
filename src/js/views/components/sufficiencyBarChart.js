import React from "react";
import {findDOMNode} from "react-dom";
import _ from "lodash";
import d3 from "d3";
import nv from "nvd3";

let SufficiencyBarChart = React.createClass({
  getDefaultProps: function() {
    return { income: {}, groups: [] };
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

  getChartData: function() {
    let data   = [],
        income = this.props.income;

    _.map(this.props.groups, (group) => {
      let groupData = {
        "title": group.name,
        "measures": [income[group.populationKey]],
        "measureLabels": ['Annual Income'],
        "ranges":[10000, 25000, 50000],
        "rangeLabels":['Federal Poverty Line', 'Federal Poverty Line', 'Federal Poverty Line']
      };

      data.push(groupData);
    });

    return data;
  },

  refreshChart: function() {
    var chartData = this.getChartData();
    // this.chart.datum(chartData);
  },

  renderChart: function() {
    var bulletChart = nv.models.bulletChart(),
        chartData   = this.getChartData();

    var width = 960,
        height = 80,
        margin = {top: 5, right: 40, bottom: 20, left: 120};

    var chart = d3.select(".chart").selectAll("svg")
      .data(chartData)
      .enter().append('svg')
      .attr("width",width)
      .attr("height",height)
      .attr('class',"bullet nvd3")
      .transition().duration(1000)
      .call(bulletChart);

    this.chart = chart;
  },

  render: function() {
    return (
      <div className="row horizontal rounded">
        <div className="col-xs-12">
            <div className="chart"></div>
        </div>
     </div>
    );
	},

  componentDidMount: function() {
    this.renderChart();
  },

  componentDidUpdate: function() {
    // this.refreshChart();
  }
});

export default SufficiencyBarChart;
