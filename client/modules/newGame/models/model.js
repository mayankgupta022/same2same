define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        
        NewGame = Backbone.Model.extend({
            urlRoot : document.serverURL + 'game/new/'
            }),

        Waiting = Backbone.Model.extend({
            urlRoot : document.serverURL + 'game/waiting/'
            });

    return {
        NewGame: NewGame,
        Waiting: Waiting
    };


});