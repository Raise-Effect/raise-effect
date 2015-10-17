import _ from 'lodash';
import $ from 'jquery';
import jQuery from 'jquery';
import Backbone from 'backbone';
import L from 'leaflet';
import { Router, Route, IndexRoute } from 'react-router';
import { render } from 'react-dom'
import React from "react";

import App from "./js/app";
import HomePage from "./js/homepage";

window.jQuery = jQuery;
require('bootstrap');

Backbone.$ = $;
window._ = _;
window.Backbone = Backbone;

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
    </Route>
  </Router>
), document.getElementById('app_container'));