import React from 'react';

let ProgressBar = React.createClass({
   propTypes: {
     completed: React.PropTypes.number.isRequired,
   },
   getDefaultProps: function() {
     return {
       completed: 0
     };
   },
	 render: function() {
    let text = this.props.text || this.props.completed + "%";
    let completed = this.props.completed;
    if (completed < 0) {completed = 0;}
    if (completed > 100) {completed = 100;}
		return (
            <div className="progress">
                <div className="progress-bar sufficient" role="progressbar" aria-valuenow={completed} style={{width:completed + "%"}} aria-valuemin="0" aria-valuemax="100">
                    <span className="percentage">{text}</span>
                </div>
            </div>
		);
	}
});

export default ProgressBar;
