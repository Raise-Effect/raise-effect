// import React from "react";
// import {findDOMNode} from "react-dom";
// import classNames from "classnames";

// let SufficiencyBarLine = React.createClass({
//   propTypes: {

//   },

//   getDefaultProps: function() {
//     return { income: 0};
//   },

//   renderChart: function() {
//     let chart = nv.models.bulletChart();

//     let data = [{
//       "title": this.props.group.name,
//       "measures":[this.props.income],
//       "measureLabels":['Annual Income'],
//       "ranges":[10000, 25000, 50000],
//       "rangeLabels":['Federal Poverty Line', 'Federal Poverty Line', 'Federal Poverty Line'],
//       // "markers":[250, 100],
//       // "markerLabels":['Target Inventory', 'Low Inventory'],
//     }];

//     let chartName = "." + this.props.group.populationKey + "-chart";

//     d3.select(chartName).selectAll("svg")
//       .data(data)
//       .enter().append('svg')
//       .attr('class',"bullet nvd3")
//       .transition().duration(1000)
//       .call(chart);
//   },

//   render: function() {
//     return (
//       <div className={this.props.group.populationKey + "-chart"}></div>
//     )
//   }
// });

// export default SufficiencyBarLine;
