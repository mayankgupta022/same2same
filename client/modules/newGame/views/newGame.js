define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        model    = require('newGame/models/model'),
        tpl      = require('text!newGame/tpl/newGame.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        events: {
            "click #submit" : "newGame"
        },

        newGame: function() {
            var newGame = new model.NewGame();
            newGame.fetch({
                    success: function (data) {
                            document.router.navigate("game", {trigger: true});
                    },
                    error: function (data) {
                        $('#newGameMsg').html('Failed to start a new game. Please try again after some time.');
                    }
            });
        },

        render: function () {
            this.$el.html(template());
            return this;
        }

    });

});