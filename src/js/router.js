import Backbone from 'backbone';

let Router = Backbone.Router.extend({
    routes: {
        '*all': 'index'
    },

    initialize(options) {
        options = options || {};
        this.appController = options.controllers.app;
    },

    index() {
        this.appController.index();
    }
});

export default Router;