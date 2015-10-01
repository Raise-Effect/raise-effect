import React from 'react';
import _ from 'lodash';
import ReactSlider from 'rc-slider';


let sliderView = React.createClass({
	getInitialState() {
		return {
			value: 13.50
		};
	},

	onChange(val) {
		let strVal = val.toString();

		this.setState({
			value: val
		});
	},

	render() {
		return (
			<ReactSlider
				className="slider"
				min={9.25}
				max={25.00}
				step={0.25}
				value={this.state.value}
				onChange={this.onChange}
				tipTransitionName="zoom-down"
			/>
		);
	}
});

export default sliderView;
