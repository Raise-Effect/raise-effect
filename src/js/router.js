import Backbone from 'backbone';
import BCRouter from 'backbone-route-control';

let Router = BCRouter.extend({
    routes: {
        '*all': 'app#index'
    },

    initialize() {
        Backbone.history.start({
          pushState: window.history && window.history.pushState,
          root: '/'
        });
    }
});

export default Router;