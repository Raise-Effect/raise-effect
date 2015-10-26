import React from "react";
import {findDOMNode} from "react-dom";
import _ from "lodash";
import d3 from "d3";
import {bulletChart as chamber} from "../charts/bulletChart";

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

  getChartData: function(updateData) {
    let data       = [],
        incomeData = updateData ? updateData.income : this.props.income,
        wageData   = updateData ? updateData.wageData : this.props.wageData;

    _.map(this.props.groups, (group) => {
      let groupData = {
        "title": group.name,
        "img": group.name === "Single Adult" ? "/public/images/family-single-adult.png": group.name === "One Adult Two Children" ? "/public/images/family-one-parent.png" : "/public/images/family-two-parent.png",
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
          "Federal Poverty Line"
        ]
      };

      data.push(groupData);
    });

    return data;
  },

  refreshChart: function(data) {
    var chartData = this.getChartData(data);

    d3.select(".chart").selectAll("svg")
      .data(chartData)
      .transition()
      .duration(1000)
      .call(this.chartType);
  },

  renderChart: function() {
    var bulletChart = chamber().color(["#1c8677"]),
        chartData   = this.getChartData();
    bulletChart.margin({"top": 0, "bottom": 0, "left": 150});
    bulletChart.ticks(10);
    bulletChart.tickFormat(function(d) {
      var parts = d.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return '$' + parts.join(".");
    });

    var chart = d3.select(".chart").selectAll("svg")
      .data(chartData)
      .enter().append("svg")
      .attr("class", "bullet nvd3")
      .attr("preserveAspectRatio","xMinYMin meet")
      .attr("viewBox", "0 0 1140 60")
      .attr("width","100%")
      .attr("height", "8em")
      .transition().duration(1000)
      .call(bulletChart);

      //Let's pretend the following line didn't happen... okay?
      d3.select(".chart").selectAll("svg")[0][2].setAttribute("viewBox", "0 0 1140 80");

      d3.selectAll(".nv-markerTriangle").remove();

    this.chartType = bulletChart;
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-12">
            <div className="info hidden-xs legend bar-legend">
            <i className="bar-poverty"></i>Federal Poverty Line<br/>
            <i className="bar-sss"></i>Self-Sufficiency Wage<br/>
            <i className="bar-median"></i>Median Income<br/>
            <i className="bar-annual"></i>Annual Income<br/>
            </div>
            <div className="info hidden-md hidden-lg hidden-sm legend bar-legend-fixed">
            <i className="bar-poverty"></i>Federal Poverty Line<br/>
            <i className="bar-sss"></i>Self-Sufficiency Wage<br/>
            <i className="bar-median"></i>Median Income<br/>
            <i className="bar-annual"></i>Annual Income<br/>
            </div>
            <div className="chart"></div>
        </div>
     </div>
    );
  },

  componentDidMount: function() {
    this.renderChart();
  },

  componentWillUpdate: function(data) {
    this.refreshChart(data);
  }
});

export default SufficiencyBarChart;
