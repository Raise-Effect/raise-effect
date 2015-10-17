import jQuery from 'jquery';
import { Router, Route, IndexRoute } from 'react-router';
import { render } from 'react-dom'
import React from "react";

import App from "./js/app";
import HomePage from "./js/homepage";
import About from "./js/about";
import Team from "./js/team";

window.jQuery = jQuery;
require('bootstrap');

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage}/>
      <Route path="/about" component={About} />
      <Route path="/team" component={Team} />
    </Route>
  </Router>
), document.getElementById('app_container'));