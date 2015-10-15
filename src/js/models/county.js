import Backbone from 'backbone';

let County = Backbone.Model.extend({
    defaults: {
        "fips": "",
        "name": ""
    },
    idAttribute: "fips"
});

export default County;
