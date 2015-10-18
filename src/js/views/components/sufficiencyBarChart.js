import React from "react";
import {findDOMNode} from "react-dom";
import _ from "lodash";
import SufficiencyBarLine from "../components/sufficiencyBarLine"

let SufficiencyBarChart = React.createClass({
   propTypes: {

   },
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
   getLines: function() {
     return _.map(this.props.groups, (group) => {
       return (
         <SufficiencyBarLine
           key={group.populationKey}
           percentage={this.props.sufficiency[group.populationKey]}
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
