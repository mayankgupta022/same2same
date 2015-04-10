define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        
        NewGame = Backbone.Model.extend({
            urlRoot : document.serverURL + 'game/new/'
            });

    return {
        NewGame: NewGame
    };


});