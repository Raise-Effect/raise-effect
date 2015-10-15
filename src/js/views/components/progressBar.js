import React from 'react';
import _ from 'lodash';


let ProgressBar = React.createClass({
	render() {
		return (
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={this.props.completed} style={{width:this.props.completed + "%"}} aria-valuemin="0" aria-valuemax="100">
                    <span className="percentage">{this.props.completed}</span>%
                </div>
            </div>
		);
	}
});

export default ProgressBar;
