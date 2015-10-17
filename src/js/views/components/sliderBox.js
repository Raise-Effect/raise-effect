import React from 'react';
import _ from 'lodash';
import SliderTooltip from '../components/sliderTooltip';
import Slider from '../components/slider';

let SliderBox = React.createClass({
	render() {
		return (
			<div>
				<Slider value={this.props.value} onChange={this.props.onChange} />
				<SliderTooltip value={this.props.value} />
			</div>
		);
	}
});

export default SliderBox;
