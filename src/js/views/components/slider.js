import React from 'react';
import _ from 'lodash';
import ReactSlider from 'rc-slider';
import SliderTooltip from '../components/sliderTooltip';

let Slider = React.createClass({
	getInitialState() {
		return {
			value: 13.50
		};
	},

	onChange(val) {
		this.setState({
			value: val
		});
	},

	render() {
		return (
			<div>
				<ReactSlider
					className="slider"
					min={9.25}
					max={25.00}
					step={0.25}
					value={this.state.value}
					onChange={this.onChange}
					tipTransitionName="zoom-down"
				/>
				<SliderTooltip value={this.state.value}/>
			</div>
		);
	}
});

export default Slider;

