define(function (require) {

    "use strict";

    var Backbone = require('backbone'),        

        SignUp = Backbone.Model.extend({
            urlRoot : document.serverURL + 'user/signUp/'
            });

    return {
        SignUp: SignUp
    };


});