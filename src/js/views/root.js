import Backbone from 'backbone';
import $ from 'jquery';
import rootTemplate from '../templates/root.hbs';

/*
 * RootView: root view's main job is to register and deregister page-level
 * views (ie, 'homepage', 'about us'), and to bind/unbind any app-global events.
 */

let RootView = Backbone.View.extend({
    name: 'root',
    template: 'rootTemplate',
    className: 'app-wrapper',

    events: {},

    initialize() {},

    render() {
        this.$el.html(this.template());
    },

    setView(view) {
        // method calls lifecycle methods, including render as well as
        // prepare() and postRender() (if view extends custom base View class)
        if (view.prepare) {
            view.prepare();
        }

        $('#main-content').html(view.render().el);

        if (view.postRender) {
            view.postRender();
        }
    }
});

export default RootView;
