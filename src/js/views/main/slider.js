import Backbone from 'backbone';
import $ from 'jquery';
import sliderTemplate from '../../templates/main/slider.hbs';
import Slider from 'bootstrap-slider';

let sliderView = Backbone.View.extend({
	name: 'slider',
	template: sliderTemplate,

  events: {},
	
	initialize() {},

  render() {
      this.$el.html(this.template());
      return this;
  },
	
	setupSlider() {
	  function updateBreakdown(value) {
	    $('span.hour').text(value);
	    $('span.day').text(value * 8);
	    $('span.week').text(value * 8 * 5);
	    $('span.month').text(value * 8 * 5 * 4);
	    $('span.year').text(value * 8 * 5 * 4 * 12);
	  }

	  $( '#wage-slider' ).slider({
	    formatter: function(value) {
	      updateBreakdown(value);
	      return '$' + value;
	    },
	    tooltip: 'always',
	    ticks: [9.25, 25],
	    ticks_labels: ['$9.25', '$25']
	  });
	},
	
});

export default sliderView;
