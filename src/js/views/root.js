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
        $('#map-container').html(mapView.render().el);
        mapView.setupMap();
    }
});

export default RootView;
