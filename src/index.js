import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import App from './js/index';
import L from 'leaflet';

Backbone.$ = $;
window._ = _;
window.Backbone = Backbone;

$(document).ready(function() {
    window.app = new App();
    window.app.start();
});
