define(function (require) {

    "use strict";

    var Backbone = require('backbone'),

        Logout = Backbone.Model.extend({
            urlRoot : document.serverURL + 'user/logout/'
            });

    return {
        Logout: Logout
    };


});