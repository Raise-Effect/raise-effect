import Backbone from 'backbone';
import County from '../models/county';

let Counties = Backbone.Collection.extend({
    model: County,
    url: "http://raiseeffect.org/api/v1/counties/",
    parse: function(response) {
        return response.data;
    },
    initialize: function() {
        this.fetch();
    }
});

export default Counties;
