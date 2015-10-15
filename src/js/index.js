import Backbone from 'backbone';
import Router from './router';
import Controller from './controllers/index';
import Counties from './collections/counties';

let App = function() {
    this.initialize();
};

App.prototype.initialize = function() {
    this.router = new Router({
        controllers: {
            app: new Controller()
        }
    });

    this.counties = new Counties();
};

App.prototype.start = function() {
    Backbone.history.start({
        pushState: window.history && window.history.pushState,
        root: '/'
    });
};

export default App;
