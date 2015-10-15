import React from 'react';
import _ from 'lodash';
import ReactSlider from 'rc-slider';

let Slider = React.createClass({
	render() {
		return (
			<ReactSlider
				className="slider"
				min={9.25}
				max={25.00}
				step={0.25}
				value={this.props.value}
				onChange={this.props.onChange}
				tipTransitionName="zoom-down"
			/>
		);
	}
});

export default Slider;
