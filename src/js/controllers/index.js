import Backbone from 'backbone';

// Views
import RootView from '../views/root';
import Homepage from '../views/main/homepage';

/*
 * The app controller contains callback functions that the router calls
 * when a user requests our app/a page in our app. These callbacks create
 * and register (via the RootView) page-level views and pass along
 * any dependencies (generally data) those views will need to render.
 */
let AppController = Backbone.View.extend({
    el: 'body',

    initialize() {
        this.rootView = new RootView();
    },

    index() {
        let homepage = new Homepage();
        this.rootView.setView(homepage, {trigger: true});
    }
});

export default AppController;
