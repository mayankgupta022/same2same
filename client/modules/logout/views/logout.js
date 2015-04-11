define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        model    = require('logout/models/model');

    return Backbone.View.extend({
        logout: function() {
            var logout = new model.Logout();
            logout.save({},{
                success: function (data) {
                    document.router.navigate("blank", {trigger: true});
                },
                error: function (data) {
                }
            });
        },

        render: function () {
            this.logout();
            return this;
        }

    });

});