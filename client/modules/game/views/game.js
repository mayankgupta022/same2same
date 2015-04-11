define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        model    = require('game/models/model'),
        tpl      = require('text!game/tpl/game.html'),
        timer,

        template = _.template(tpl);

    return Backbone.View.extend({

        events: {
            "click .submit" : "response"
        },

        getQuestion: function() {
            var self = this;
            var question = new model.Question();
            question.fetch({
                    success: function (data) {
                        if (data.attributes.msg == "WON")                            
                            document.router.navigate("result", {trigger: true});
                        else
                        {
                            console.log(data.attributes.question);
                            self.$el.html(template(data.attributes.question));
                        }
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
        },

        response: function(e) {
            var self = this;
            var response = new model.Response();
            console.log(e.target.id);
            response.save({
                    response : parseInt(e.target.id)
                }, {
                success: function (data) {
                    $('#responseMsg').html('Waiting for other player to respond');
                    self.validate();
                },
                error: function (data) {
                    $('#responseMsg').html('Failed to start a new response. Please try again after some time.');
                }
            });
        },

        validate: function() {
            var self = this;
            var validate = new model.Validate();
            this.timer = setInterval(function () {
                validate.fetch({
                    success: function (data) {
                        if (data.attributes.msg == "NEXT")
                        {
                            self.render();
                        }
                        else if (data.attributes.msg == 'LOST')
                            $('#responseMsg').html('Responses do not match. Either change your response or wait for other player');
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }, 5000);

        },

        render: function () {
            this.close();
            this.getQuestion();
            return this;
        },

        close: function () {
            if(this.timer)
                clearInterval(this.timer);
        }

    });

});