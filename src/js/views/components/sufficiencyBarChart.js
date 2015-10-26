import React from "react";
import {findDOMNode} from "react-dom";
import _ from "lodash";
import d3 from "d3";
import nv from "nvd3";

let SufficiencyBarChart = React.createClass({
  getDefaultProps: function() {
    return { income: {}, groups: [], wageData: {} };
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
    let data       = [],
        incomeData = this.props.income,
        wageData   = this.props.wageData;

    _.map(this.props.groups, (group) => {
      let groupData = {
        "title": group.name,
        "measures": [incomeData[group.populationKey]],
        "measureLabels": ["Annual Income"],
        "ranges": [
          wageData[group.populationKey].povertyLine,
          wageData[group.populationKey].sufficiencyWage,
          wageData[group.populationKey].medianIncome,
          // wageData[group.populationKey].householdMedianIncome
        ],
        "rangeLabels": [
          // "Median Household Income",
          "Median Income",
          "Self-Sufficiency Wage",
          "Poverty Line"
        ]
      };

      data.push(groupData);
    });

    return data;
  },

  refreshChart: function() {
    var chartData = this.getChartData();

    d3.select(".chart").selectAll("svg")
      .data(chartData)
      .transition()
      .duration(1000)
      .call(this.chartType);
  },

  renderChart: function() {
    var bulletChart = nv.models.bulletChart().color(["#1c8677"]),
        chartData   = this.getChartData();

    bulletChart.margin({"top": 0, "bottom": 0, "left": 200});

    var chart = d3.select(".chart").selectAll("svg")
      .data(chartData)
      .enter().append("svg")
      .attr("class", "bullet nvd3")
      .attr("preserveAspectRatio","xMinYMin meet")
      .attr("viewBox", "0 0 1140 112")
      .attr("width","100%")
      .attr("height", "8em")
      .transition().duration(1000)
      .call(bulletChart);

      d3.selectAll(".nv-markerTriangle").remove();

    this.chartType = bulletChart;
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12">
            <div className="chart"></div>
        </div>
     </div>
    );
  },

  componentDidMount: function() {
    this.renderChart();
  },

  componentWillUpdate: function() {
    this.refreshChart();
  }
});

export default SufficiencyBarChart;
