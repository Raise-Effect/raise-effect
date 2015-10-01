import React from 'react';
import _ from 'lodash';
import SliderTooltip from '../components/sliderTooltip';
import Slider from '../components/slider';

let SliderBox = React.createClass({
	render() {
		return (
			<div>
				<Slider />
				<SliderTooltip />
			</div>
		);
	}
});

export default SliderBox;