import Backbone from 'backbone';

// Views
import RootView from '../views/root';
import MapView from  '../views/main/map'
import SliderView from '../views/main/slider'
import Homepage from '../views/main/homepage';

let AppController = Backbone.View.extend({
    el: 'body',

    initialize() {
        this.rootView = new RootView();
    },

    index() {
        let homepage = new Homepage();
        let map      = new MapView();
				let slider   = new SliderView();

        this.rootView.setView(homepage, {trigger: true});
        this.rootView.addMap(map, {trigger: true});
				this.rootView.addSlider(slider, {trigger: true});
    }
});

export default AppController;
