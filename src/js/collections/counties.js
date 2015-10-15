import Backbone from 'backbone';
import County from '../models/county';

let Counties = Backbone.Collection.extend({
    model: County,
    url: "http://raiseeffect.org/api/v1/counties",
    initialize: function() {}
});

export default Counties;
