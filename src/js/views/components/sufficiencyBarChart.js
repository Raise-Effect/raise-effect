import React from "react";
import {findDOMNode} from "react-dom";
import _ from "lodash";
import SufficiencyBarLine from "../components/sufficiencyBarLine"

let SufficiencyBarChart = React.createClass({
   propTypes: {

   },
   getDefaultProps: function() {
     return { selectedCounty: 41, weights: [], wages: [], groups: [], salary: 1};
   },
   getPercentage: function(populationKeys, modifier) {
     if (this.props.selectedCounty == "41")
     {
       return 9000;
     }
     let filteredWeights = this.props.weights[this.props.selectedCounty];
     let filteredWages = this.props.wages[this.props.selectedCounty];
     let moreweight = 0;
     _.forEach(filteredWeights, (weight) => {
       if (_.find(populationKeys, (key) => weight.familycode === key))
       {
         moreweight += weight.weight;
       }
     });
     console.log(moreweight + " More!")
     let percent = 0;
     let sumweight = 0;
     let output = "0 ";
     let annual = 0;
     _.forEach(populationKeys, (group) => {
       let weight = 1;
       if (populationKeys.length > 1)
       {
         weight = _.find(filteredWeights, (weight) => weight.familycode === group).weight / moreweight;
         sumweight += weight;
       }
       annual = _.find(filteredWages, (wage) => wage.familyCode === group).annual;
       output += "+ " + weight + " * " + annual + " ";
       percent += (weight * annual);
     });
     console.log(output);
     console.log(percent);
     console.log(this.props.salary + " * " + modifier + " / " + percent);
     console.log(sumweight);
     return Math.round(((this.props.salary * modifier) / percent) * 100);

   },
   getHeaders: function() {
     return _.map(this.props.groups, (group) => {
       return (
         <div className="horizontal text-right">
             <span>{group.name}</span>
         </div>
       )
     });
   },
   getLines: function() {
     return _.map(this.props.groups, (group) => {
       return (
         <SufficiencyBarLine
           key={group.name}
           percentage={this.getPercentage(group.populationKeys, group.modifier)}
         />
       )
     });
   },
	 render: function() {
		return (
      <div className="row horizontal rounded">
           <div className="col-xs-3">
            {this.getHeaders()}
          </div>
        <div className="col-xs-9">
          <div className="dotted-divider"/>
            {this.getLines()}
        </div>
     </div>

		);
	}
});

export default SufficiencyBarChart;
