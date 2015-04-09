define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        model    = require('login/models/model'),
        tpl      = require('text!login/tpl/login.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        events: {
            "click #submit" : "login",
            "keydown" : "onkeydown"
        },

        onkeydown: function(e) {
            var code = e.keyCode || e.which;
            var username = $('#username').val(),
                password = $('#password').val();
            if (username != '')
                $('#username').removeClass('error').addClass('success');
            if (password != '')
                $('#password').removeClass('error').addClass('success');
            // if(code === 13) 
                // this.login();
        },

        login: function() {

            var username = $('#username').val(),
                password = $('#password').val();
            if (username == '')
            {
                $('#loginMsg').html('Please enter your username');
                $('#username').removeClass('success').addClass('error').focus();
            }
            else if (password == '')
            {
                $('#loginMsg').html('Please enter your password');
                $('#password').removeClass('success').addClass('error').focus();
            }
            else {
                var login = new model.Login();
                login.save({
                    username: username,
                    password: password
                    }, {
                        success: function (data) {
                            if (data.attributes.status === 1 && data.attributes.msg === 'invalid')
                                $('#loginMsg').html('Username and password do not match!');
                            if (data.attributes.status === 1 && data.attributes.msg === 'deactivated')
                                $('#loginMsg').html('Your account has been deactivated!');
                            else
                                document.router.navigate("blank", {trigger: true});
                        },
                        error: function (data) {
                            $('#loginMsg').html('Login failed');
                        }
                });
            }
        },

        render: function (menuView) {
            if (menuView) {
                menuView.updateMenu(model.MenuData);
            }
            this.$el.html(template());
            return this;
        }

    });

});