import Backbone from 'backbone';
import L from 'leaflet';
import Counties from "./../../../fixtures/countiesGeoJSON.js";
import MonthlyCosts from "./../../../fixtures/selfsufficiency.js";

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

    onEachFeature(feature, layer) {
        layer.on({
          mouseover: this.highlightFeature,
          // mouseout: resetHighlight,
          // click: zoomToFeature
        });
    },

    setupMap() {
        var token = 'pk.eyJ1IjoibnJiZXJuYXJkIiwiYSI6IjdkMGZhZmMyNmI4YjgzN2I0ZjI2MjUxMWE5MjVjM2I1In0.kAeFFdUCeEc5lOqyaMvHkA',
            map   = L.map('map', { zoomControl:true }).setView([44.121, -120.587], 7);

        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + token, {
          id: 'mapbox.pencil'
        }).addTo(map);

        L.geoJson(Counties, {
          // style: style,
          // onEachFeature: this.onEachFeature
        }).addTo(map);
    },


});

export default MapView;
