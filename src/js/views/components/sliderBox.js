import React from 'react';
import _ from 'lodash';
import SliderTooltip from '../components/sliderTooltip';
import Slider from '../components/slider';

let SliderBox = React.createClass({
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
				<Slider value={this.state.value} onChange={this.onChange} />
				<SliderTooltip value={this.state.value} />
			</div>
		);
	}
});

export default SliderBox;