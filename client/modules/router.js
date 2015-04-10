define(function (require) {

    "use strict";

    var model       = require('common/models/model'),
        ShellView   = require('shell/views/shell'),
        $body       = $('body'),
        shellView,
        currentView,
        $content;

    return Backbone.Router.extend({

        routes: {

            /**********/
            /* COMMON */
            /**********/

            "": "home",
            "blank": "blank",

            /**********/
            /* USER */
            /**********/

            "login": "login",
            "logout": "logout",
            "signUp": "signUp",

            /**********/
            /* GAME */
            /**********/

            "new": "newGame",
            "result": "resultGame",
            "game": "game"
        },

/**********/
/* COMMON */
/**********/
        initialize: function () {

            this.listenTo(this, "route", this.getInfo);

            shellView = new ShellView();
            $body.html(shellView.render().el);
            $content = $("#content");
        },

        blank: function () {
            document.router.navigate("", {trigger: true, replace: true});//replace: true required if history not to be maintained
        },

        home: function () {
            var self = this;
            var getInfo = new model.GetInfo();
            getInfo.fetch({
                        success: function (data) {
                            document.role = data.attributes.status;
                            document.firstName = data.attributes.firstName;
                            document.lastName = data.attributes.lastName;
                            document.email = data.attributes.email;
                            document.match = data.attributes.match;
                            if(document.match)
                                document.router.navigate("game", {trigger: true, replace: true});
                            else if(document.role)
                                document.router.navigate("new", {trigger: true, replace: true});
                            else
                                document.router.navigate("login", {trigger: true, replace: true});
                        },
                        error: function (data) {
                            document.role = 0;
                            document.firstName = 'Anon';
                            document.lastName = '';
                            document.match = null;
                        }
                });
        },

        getInfo: function() {
            var getInfo = new model.GetInfo();
            getInfo.fetch({
                        success: function (data) {
                            document.role = data.attributes.status;
                            document.firstName = data.attributes.firstName;
                            document.lastName = data.attributes.lastName;
                            document.email = data.attributes.email;
                            document.match = data.attributes.match;
                        },
                        error: function (data) {
                            document.role = 0;
                            document.firstName = 'Anon';
                            document.lastName = '';
                            document.match = null;
                        }
                });
        },

        updateCurrentView: function(newView) {
            //COMPLETELY UNBIND THE VIEW
            if(this.currentView) {
                if(typeof this.currentView.close === "function")
                    this.currentView.close();
                this.currentView.undelegateEvents();
                $(this.currentView.el).removeData().unbind(); 
                //Remove currentView from DOM
                this.currentView.remove();  
                Backbone.View.prototype.remove.call(this.currentView);

            }
            this.currentView=newView;
            this.currentView.delegateEvents(); // delegate events when the view is recycled
        },

/**********/
/* USER */
/**********/

        login: function () {
            var self = this;
            require(["login/views/login"], function (LoginView) {
                var loginView = new LoginView();
                self.updateCurrentView(loginView);
                $(loginView.render().el).appendTo($content);
            });
        },

        logout: function () {
            var self = this;
            require(["logout/views/logout"], function (LogoutView) {
                var logoutView = new LogoutView();
                self.updateCurrentView(logoutView);
                $(logoutView.render().el).appendTo($content);
            });
        },

        signUp: function () {
            var self = this;
            require(["signUp/views/signUp"], function (SignUpView) {
                var signUpView = new SignUpView();
                self.updateCurrentView(signUpView);
                $(signUpView.render().el).appendTo($content);
            });
        },

/**********/
/* GAME */
/**********/

        newGame: function () {
            var self = this;
            require(["newGame/views/newGame"], function (NewGameView) {
                var newGameView = new NewGameView();
                self.updateCurrentView(newGameView);
                $(newGameView.render().el).appendTo($content);
            });
        },

        resultGame: function () {
            var self = this;
            require(["resultGame/views/resultGame"], function (ResultGameView) {
                var resultGameView = new ResultGameView();
                self.updateCurrentView(resultGameView);
                $(resultGameView.render().el).appendTo($content);
            });
        },

        game: function () {
            var self = this;
            require(["game/views/game"], function (GameView) {
                var gameView = new GameView();
                self.updateCurrentView(gameView);
                $(gameView.render().el).appendTo($content);
            });
        },

    });

});