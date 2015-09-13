import _ from 'lodash';
import $ from 'jquery';
import jQuery from 'jquery';
import Backbone from 'backbone';
import L from 'leaflet';
import App from './js/index';

Backbone.$ = $;
window._ = _;
window.Backbone = Backbone;

$(document).ready(function() {
    window.app = new App();
    window.app.start();
});
