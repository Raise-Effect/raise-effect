import Backbone from 'backbone';
import Router from './router';
import Controller from './controllers/index';



let App = function() {
    this.initialize();
};

App.prototype.initialize = function() {
    this.router = new Router({
        controllers: {
            app: new Controller()
        }
    });

};

App.prototype.start = function() {
    Backbone.history.start({
        pushState: window.history && window.history.pushState,
        root: '/'
    });
};

export default App;
