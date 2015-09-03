import Backbone from 'backbone';
import homepageTemplate from '../../templates/main/homepage.hbs';

let HomepageView = Backbone.View.extend({
    name: 'homepage',
    template: homepageTemplate,
    className: 'home',

    events: {},

    initialize() {},

    render() {
        this.$el.html(this.template());
        return this;
    }
});

export default HomepageView;
