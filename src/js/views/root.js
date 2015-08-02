import Backbone from 'backbone';
import rootTemplate from 'hbs!templates/root';

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
        this.$('#main-content').html(view.render().$el);
    }
});

export default RootView;