import React from 'react';
import View from '../view';
import MapView from  '../components/map';
import Slider from '../components/slider';
import homepageTemplate from '../../templates/main/homepage.hbs';


let HomepageView = View.extend({
    name: 'homepage',
    template: homepageTemplate,
    className: 'col-xs-12',

    events: {},

    initialize(options) {
        options = options || {};

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
            <Slider />, document.getElementById('slider')
        );
    }
});

export default HomepageView;
