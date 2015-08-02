import Backbone from 'backbone';
import homepageTemplate from 'hbs!templates/main/homepage';

let HomepageView = Backbone.View.extend({
    name: 'homepage',
    template: 'homepageTemplate',
    className: 'home',

    events: {},

    initialize() {},

    render() {
        this.$el.html(this.template());
    }
});

export default HomepageView;