define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        tpl      = require('text!shell/tpl/shell.html'),
        template = _.template(tpl);

    return Backbone.View.extend({

        render: function () {
            this.$el.html(template());
            return this;
        }
    });

});