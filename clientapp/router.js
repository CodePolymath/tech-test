var Backbone = require('backbone'),
    HomeView = require('./views/home'),
    NewUser = require('./views/newuser'),
    Users = require('./views/users');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'home',
        'home': 'home',
        'newuser': 'newuser',
        'users': 'users'
    },

    home: function (){
        var newView = new HomeView();
        app.renderView(newView);
    },

    newuser: function() {
        var newView = new NewUser();
        app.renderView(newView);
    },

    users: function() {
        var newView = new Users();
    }
});
