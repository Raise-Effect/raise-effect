import React from 'react';
import View from '../view';
import MapView from  '../components/map';
import SliderBox from '../components/sliderBox';
import Households from '../components/households';
import homepageTemplate from '../../templates/main/homepage.hbs';
import ProgressBar from '../components/progressBar';
import Counties from '../../collections/counties';

let HomepageView = View.extend({
    name: 'homepage',
    template: homepageTemplate,
    className: 'col-xs-12',

    events: {},

    initialize(options) {
        options = options || {};
        this.counties = new Counties();
        this.mapView = new MapView();
    },

    render() {
        this.$el.html(this.template());
        this.mapView.setElement(this.$('#map'));
        return this;
    },

    postRender() {
        this.mapView.render();


        React.render(
            <SliderBox />, document.getElementById('slider')
        );
        React.render(
            <Households />, document.getElementById('households')
        );
        React.render(
            <ProgressBar completed={47}/>, document.getElementById('impactProgress')
        )

    }
});


export default HomepageView;
