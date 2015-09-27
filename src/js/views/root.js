import Backbone from 'backbone';
import $ from 'jquery';
import rootTemplate from '../templates/root.hbs';

let RootView = Backbone.View.extend({
    name: 'root',
    template: 'rootTemplate',
    className: 'app-wrapper',

    events: {},

    initialize() {},

    render() {
        this.$el.html(this.template());
    },

    setView(view) {
        $('#main-content').html(view.render().el);
    },

    addMap(mapView) {
        $('#main-content div').append(mapView.render().el);
        mapView.setupMap();
    },
		
    addSlider(sliderView) {
        $('#main-content div').append(sliderView.render().el);
        sliderView.setupSlider();
    },
});

export default RootView;
