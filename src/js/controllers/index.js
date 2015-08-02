import Backbone from 'backbone';

// Views
import RootView from './views/root';
import Homepage from './views/main/homepage';

let AppController = Backbone.View.extend({
    el: 'body',

    initialize() {
        this.rootView = new RootView();
    },

    index() {
        let homepage = new Homepage();
        this.rootView.setView('homepage', {trigger: true});
    }
});

export default AppController;