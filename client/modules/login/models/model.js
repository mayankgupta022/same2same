define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        menuData = {
            "top" : {
                "visible" : false,
                "left" : {
                    "visible" : true,
                    "title" : "topLeft",
                    "icon" : "",
                    "route" : "try/2",
                    "active" : false
                },
                "middle" : {
                    "visible" : true,
                    "title" : "Home",
                    "icon" : "",
                    "route" : "blank",
                    "active" : false
                },
                "right" : {
                    "visible" : true,
                    "title" : "topRight",
                    "icon" : "",
                    "route" : "",
                    "active" : false
                }
            },
            "bottom" : {
                "visible" : true,
                "first" : {
                    "visible" : true,
                    "title" : "Login",
                    "icon" : "",
                    "route" : "login",
                    "active" : true
                },
                "second" : {
                    "visible" : true,
                    "title" : "SignUp",
                    "icon" : "",
                    "route" : "signUp",
                    "active" : false
                },
                "third" : {
                    "visible" : false,
                    "title" : "bottomRight",
                    "icon" : "",
                    "route" : "",
                    "active" : true
                }
            }
        },

        Login = Backbone.Model.extend({
            urlRoot : document.serverURL + 'user/login/'
            });

    return {
        MenuData: menuData,
        Login: Login
    };


});