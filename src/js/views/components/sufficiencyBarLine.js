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
     let percent = this.props.percentage;
     let color = classNames("progress-fill", "under")
     if (this.props.percentage >= 150)
     {
       color = classNames("progress-fill", "over")
     }
     else if (this.props.percentage >= 100) {
       color = classNames("progress-fill", "sufficient")
     }
     if (this.props.percentage > 200)
     {
       percent = 200;
     }
		return (
      <div className="horizontal">
        <div className="progress-track">
          <div className={color} style={{width:percent / 2 + "%"}}>
            <span>{this.props.percentage}%</span>
          </div>
        </div>
      </div>
      )
      }
      });
export default SufficiencyBarLine;
