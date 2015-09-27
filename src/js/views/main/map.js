import Backbone from 'backbone';
import L from 'leaflet';
import Counties from "./../../../fixtures/countiesGeoJSON.js";
import MonthlyCosts from "./../../../fixtures/selfsufficiency.js";
import SampleData from "./../../../fixtures/sampleCountyData.js";

let MapView = Backbone.View.extend({
    name: 'map',
    tagName: 'div',
    id: 'map',
    className: 'leaflet-container leaflet-retina leaflet-fade-anim',

    events: {},

    initialize() {
        _.bindAll(this, 'styleFeature', 'setupFeature', 'resetStyle', 'zoomToFeature');
    },

    render() {
        this.$el.html();
        return this;
    },

    styleFeature(feature) {
        return {
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
          fillColor: this.fillColor(feature)
        };
    },

    fillColor(feature) {
        var id = feature.properties.name.split(' County')[0],
            medianIncome = SampleData[id]["median household income"];

        switch (true) {
            case (medianIncome >= 55000):
                return '#08519c';
            case (medianIncome >= 50000):
                return '#3182bd';
            case (medianIncome >= 45000):
                return '#6baed6';
            case (medianIncome >= 40000):
                return '#9ecae1';
            case (medianIncome >= 35000):
                return '#c6dbef';
            case (medianIncome < 35000):
                return '#eff3ff';
            default:
                return '#eff3ff';
        }
    },

    setupFeature(feature, layer) {
        layer.on({
          mouseover: this.highlightFeature,
          mouseout: this.resetStyle,
          click: this.zoomToFeature
        });
    },

    highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#08306b',
            dashArray: '',
            fillOpacity: 0.7,
            fillColor: '#08306b',
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }

        // info.update(layer.feature.properties);
    },

    resetStyle(e) {
        this.geoLayer.resetStyle(e.target);
    },

    zoomToFeature(e) {
        this.map.fitBounds(e.target.getBounds());
    },

    setupMap() {
        var token = 'pk.eyJ1IjoibnJiZXJuYXJkIiwiYSI6IjdkMGZhZmMyNmI4YjgzN2I0ZjI2MjUxMWE5MjVjM2I1In0.kAeFFdUCeEc5lOqyaMvHkA',
            map   = L.map('map', { zoomControl:true }).setView([44.121, -120.587], 7),
            that  = this;

        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + token, {
          id: 'mapbox.pencil'
        }).addTo(map);

        var geoLayer = L.geoJson(Counties, {
          style: that.styleFeature,
          onEachFeature: that.setupFeature
        })
        geoLayer.addTo(map);

        that.geoLayer = geoLayer;
        that.map = map;
    },
});

export default MapView;