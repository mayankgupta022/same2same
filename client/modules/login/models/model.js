define(function (require) {

    "use strict";

    var Backbone = require('backbone'),

        Login = Backbone.Model.extend({
            urlRoot : document.serverURL + 'user/login/'
            });

    return {
        Login: Login
    };

});