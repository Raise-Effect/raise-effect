import _ from 'lodash';
import $ from 'jquery';
import {App} from 'js/index';

Backbone.$ = $;
window._ = _;
window.Backbone = Backbone;

document.addEventListener('deviceready', function() {
    window.app = new App();
});
