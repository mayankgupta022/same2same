define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        model    = require('newGame/models/model'),
        tpl      = require('text!newGame/tpl/newGame.html'),
        timer,

        template = _.template(tpl);

    return Backbone.View.extend({

        events: {
            "click #submit" : "newGame"
        },

        newGame: function() {
            var self = this;

            $('#newGameMsg').html('&nbsp;');

            var newGame = new model.NewGame();
            newGame.fetch({
                success: function (data) {
                        $('#submit').html('Waiting for other player...');
                        $('#submit').attr('disabled','disabled');
                        self.waiting();
                },
                error: function (data) {
                    $('#newGameMsg').html('Failed to start a new game. Please try again after some time.');
                    $('#submit').removeAttr('disabled');
                }
            });
        },

        waiting: function() {
            var waiting = new model.Waiting();
            this.timer = setInterval(function () {
                waiting.fetch({
                    success: function (data) {
                        if (data.attributes.msg == "READY")
                            document.router.navigate("game", {trigger: true});
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }, 5000);
        },

        render: function () {
            this.$el.html(template());
            return this;
        },

        close: function () {
            clearInterval(this.timer);
        }

    });

});