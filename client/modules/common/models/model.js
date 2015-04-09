define(function (require) {

    "use strict";

    var Backbone  = require('backbone'),
        server_ip = 'localhost:84';

    document.serverURL = 'http://' + server_ip + '/';
    document.mediaURL = 'http://' + server_ip + '/';

    var originalSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {
        if (method === "read" || method === "create"|| method === "update" || method === "delete") {
            options.dataType = "json";
            if (!options.crossDomain) {
                options.crossDomain = true;
            }

            if (!options.xhrFields) {
                options.xhrFields = {withCredentials:true};
            }

            return originalSync(method, model, options);
        }
    };


    var GetInfo = Backbone.Model.extend({
            urlRoot : document.serverURL + 'user/getInfo/'
            });

    return {
        GetInfo : GetInfo
    };


});