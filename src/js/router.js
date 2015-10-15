import Backbone from 'backbone';

/*
 * Router's job is to field requests for "pages" in our SPA, and to
 * bind those requests to the appropriate callback in our app-controller.
 */

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
