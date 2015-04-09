define(function (require) {

    "use strict";

    var Backbone = require('backbone'),
        model    = require('signUp/models/model'),
        tpl      = require('text!signUp/tpl/signUp.html'),

        template = _.template(tpl);

    return Backbone.View.extend({

        events: {
            "click #submit" : "signUp",
            "keydown" : "onkeydown"
        },

        onkeydown: function(e) {
            var code = e.keyCode || e.which;
            var username = $('#username').val(),
                email = $('#email').val(),
                password = $('#password').val(),
                confirmPassword = $('#confirmPassword').val();
            if (username != '')
                $('#username').removeClass('error').addClass('success');
            if (firstName != '')
                $('#firstName').removeClass('error').addClass('success');
            if (lastName != '')
                $('#lastName').removeClass('error').addClass('success');
            if (email != '')
                $('#email').removeClass('error').addClass('success');
            if (password != '')
                $('#password').removeClass('error').addClass('success');
            if (confirmPassword == password)
                $('#confirmPassword').removeClass('error').addClass('success');
            else if (confirmPassword != '')
                $('#confirmPassword').removeClass('success').addClass('error');
            // if(code == 13) 
                // this.signUp();
        },

        signUp: function() {

            var username = $('#username').val(),
                firstName = $('#firstName').val(),
                lastName = $('#lastName').val(),
                email = $('#email').val(),
                password = $('#password').val(),
                confirmPassword = $('#confirmPassword').val();
            if (username == '')
            {
                $('#signUpMsg').html('Please enter your username');
                $('#username').removeClass('success').addClass('error').focus();
            }
            else if (firstName == '')
            {
                $('#signUpMsg').html('Please enter your First Name');
                $('#firstName').removeClass('success').addClass('error').focus();
            }
            else if (lastName == '')
            {
                $('#signUpMsg').html('Please enter your Last Name');
                $('#lastName').removeClass('success').addClass('error').focus();
            }
            else if (email == '')
            {
                $('#signUpMsg').html('Please enter your email');
                $('#email').removeClass('success').addClass('error').focus();
            }
            else if (password == '')
            {
                $('#signUpMsg').html('Please enter your password');
                $('#password').removeClass('success').addClass('error').focus();
            }
            else if (confirmPassword == '')
            {
                $('#signUpMsg').html('Please confirm your password');
                $('#confirmPassword').removeClass('success').addClass('error').focus();
            }
            else if (confirmPassword != password)
            {
                $('#signUpMsg').html('New and Confirm passwords do not match. Please confirm your password');
                $('#confirmPassword').removeClass('success').addClass('error').focus();
            }
            else {
                var signUp = new model.SignUp();
                signUp.save({
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                    }, {
                        success: function (data) {
                            if (data.attributes.status === 1 && data.attributes.msg === 'alreadyExists')
                                $('#signUpMsg').html('Username not available! Please try another');
                            else
                                document.router.navigate("blank", {trigger: true});
                        },
                        error: function (data) {
                            $('#signUpMsg').html('SignUp failed');
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