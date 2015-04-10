define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        tpl      = require('text!resultGame/tpl/resultGame.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        events: {
            "click #submit" : "resultGame"
        },

        resultGame: function() {
            document.router.navigate("new", {trigger: true});
        },

        render: function () {
            this.$el.html(template());
            return this;
        }

    });

});