import Backbone from 'backbone';
import County from '../models/county';

let Counties = Backbone.Collection.extend({
    model: County,
    url: "http://raiseeffect.org/api/v1/counties/",
    parse: function(response) {
        return response.data;
    },
    initialize: function() {
        this.fetch({
            success: function(data) {
                for (var i = 0; i < data.models.length; i++) {
                    console.log(data.models[i].attributes);
                };
            }
        });
    }
});

export default Counties;
