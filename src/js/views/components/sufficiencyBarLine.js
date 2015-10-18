import React from "react";
import {findDOMNode} from "react-dom";


let SufficiencyBarLine = React.createClass({
   propTypes: {

   },
   getDefaultProps: function() {
     return { percentage: 0};
   },
	 render: function() {
     let percent = this.props.percentage;
     if (this.props.percentage > 200)
     {
       percent = 200;
     }
		return (
<div className="horizontal">
  <div className="progress-track">
    <div className="progress-fill" style={{width:percent / 2 + "%"}}>
      <span>{this.props.percentage}%</span>
    </div>
  </div>
</div>
)
}
});
export default SufficiencyBarLine;
