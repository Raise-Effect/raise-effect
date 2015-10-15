import Backbone from 'backbone';

/*
 * Base view class that allows us to add lifecycle methods
 *
 */
let View = Backbone.View.extend({
    prepare: function() {
        // Custom lifecycle method for doing any data setup, including
        // data fetching, etc.
    },

    postRender: function() {
        // Custom lifecycle method for doing any post-rendering work --
        // especially useful for any child view that needs a DOM node
        // available to it.
    }
});

export default View;
