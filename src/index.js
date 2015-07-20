import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone';
import App from './js/index';

Backbone.$ = $;
window._ = _;
window.Backbone = Backbone;

document.addEventListener('deviceready', function() {
    window.app = new App();
    window.app.start();
});
