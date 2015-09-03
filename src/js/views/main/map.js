import Backbone from 'backbone';
import L from 'leaflet';

let MapView = Backbone.View.extend({
    name: 'map',
    tagName: 'div',
    id: 'map',
    className: 'leaflet-container leaflet-retina leaflet-fade-anim',

    events: {},

    initialize() {},

    render() {
        this.$el.html();
        return this;
    },

    setupMap() {
        var token = "pk.eyJ1IjoibnJiZXJuYXJkIiwiYSI6IjdkMGZhZmMyNmI4YjgzN2I0ZjI2MjUxMWE5MjVjM2I1In0.kAeFFdUCeEc5lOqyaMvHkA",
            map   = L.map('map', { zoomControl:true }).setView([44.121, -120.587], 7);

        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + token, {
          id: 'mapbox.pencil'
        }).addTo(map);

        L.geoJson(counties, {
          // style: style,
          // onEachFeature: onEachFeature
        }).addTo(map);
    }
});

export default MapView;
