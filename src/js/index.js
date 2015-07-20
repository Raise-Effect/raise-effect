import Backbone from 'backbone';
import Router from './router';
import Controller from './controllers/index';

let App = function() {
  this.initialize();
};

App.prototype.initialize = function() {
  this.appController = new Controller();
  this.router = new Router({
    controllers: {
      app: this.appController
    }
  });
};

App.prototype.start = function() {
  Backbone.history.start({
    pushState: true
  });
};

export default App;