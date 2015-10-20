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
    let completed = this.props.completed;
    if (completed < 0) {completed = 0};
    if (completed > 100) {completed = 100};
		return (
            <div className="progress">
                <div className="progress-bar sufficient" role="progressbar" aria-valuenow={this.props.completed} style={{width:this.props.completed + "%"}} aria-valuemin="0" aria-valuemax="100">
                    <span className="percentage">{this.props.completed}</span>%
                </div>
            </div>
		);
	}
});

export default ProgressBar;
