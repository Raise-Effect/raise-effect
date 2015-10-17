import L from 'leaflet';
import Counties from "./../../../fixtures/countiesGeoJSON.js";
import MonthlyCosts from "./../../../fixtures/selfsufficiency.js";
import SampleData from "./../../../fixtures/sampleCountyData.js";
import React from "react";
import {findDOMNode} from "react-dom";
import _ from "lodash";

let MapView = React.createClass({
    componentDidMount: function() {
        let token = 'pk.eyJ1IjoibnJiZXJuYXJkIiwiYSI6IjdkMGZhZmMyNmI4YjgzN2I0ZjI2MjUxMWE5MjVjM2I1In0.kAeFFdUCeEc5lOqyaMvHkA';
        let map = L.map('map', { zoomControl:true }).setView([44.121, -120.587], 6);

        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + token, {
          id: 'mapbox.pencil'
        }).addTo(map);

        let geoLayer = L.geoJson(Counties, {
          style: _.bind(this.styleLayer, this),
          onEachFeature: _.bind(this.setupFeature, this)
        });
        geoLayer.addTo(map);

        this.geoLayer = geoLayer;
        this.map = map;
    },

    componentWillUpdate: function(data) {
        let fips   = data.selectedCounty.toString();
        let layers = this.geoLayer.getLayers();
        let that   = this;

        _.forEach(layers, function(layer) {
            that.styleLayer(layer);
            that.resetLayer(layer);

            if (fips === "41") return that.focusOnMap();

            if (layer.feature.properties.fips === fips) {
                that.focusOnLayer(layer);
            } else {
                that.hideLayer(layer);
            }
        });
    },

    setupFeature: function(feature, layer) {
        layer.on({
            mouseover: this.highlightLayer,
            mouseout: this.resetLayer,
            click: this.focusOnLayer
        });
    },

    styleLayer: function(layer) {
        return {
            stroke: true,
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fill: true,
            fillOpacity: 0.7,
            fillColor: this.fillColor(layer)
        };
    },

    fillColor: function(layer) {
        // let id = layer.properties.name.split(' County')[0];
        // let medianIncome = SampleData[id]["median household income"];

        let medianIncome = Math.random() * (60000 - 35000) + 35000;

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

    highlightLayer: function(event) {
        let layer = event.target;

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
    },

    resetLayer: function(event) {
        var layer = (typeof event.target === 'undefined') ? event : event.target;
        this.geoLayer.resetStyle(layer);
    },

    hideLayer: function(layer) {
        layer.setStyle({
            stroke: false,
            fill: false,
        });
    },

    focusOnMap: function() {
        this.map.setView([44.121, -120.587], 6, {animate: true, pan: {animate: true, duration: 1}, zoom: {animate: true}});
    },

    focusOnLayer: function(event) {
        var layer = (typeof event.target === 'undefined') ? event : event.target;
        this.map.fitBounds(layer.getBounds(), {animate: true, pan: {animate: true, duration: 1}, zoom: {animate: true}});
    },

    render: function() {
        return (
            <div className="leaflet-container leaflet-retina leaflet-fade-anim"></div>
        )
    }
});

export default MapView;
