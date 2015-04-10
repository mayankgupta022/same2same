define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        
        Question = Backbone.Model.extend({
            urlRoot : document.serverURL + 'game/getQuestion/'
            }),

        Response = Backbone.Model.extend({
            urlRoot : document.serverURL + 'game/response/'
            }),

        Validate = Backbone.Model.extend({
            urlRoot : document.serverURL + 'game/validate/'
            });

    return {
        Question: Question,
        Response: Response,
        Validate: Validate
    };

});