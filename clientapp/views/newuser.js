var Backbone = require('backbone'),
    templates = require('../templates'),
    UserModel = require('../models/user');

module.exports = Backbone.View.extend({

    el: $('#content'),

    events: {
        'click #btnCreate': 'createUser'
    },

    model: new UserModel(),

    initialize: function(){
        this.template = templates.newuser;
    },

    render: function(){
        this.$el.html(this.template());
        this.$el.find('input:first').focus();
        return this;
    },

    createUser: function(){
        var inputs = this.$('input');
        var values = {}; // container for POSTed values
        this.$('.has-error').removeClass('has-error');
        var divMessage = this.$('#divMessage').addClass('hidden');
        for (var i = 0, l = inputs.length; i < l; i++) {
            if (inputs[i].value.length === 0){
                if (inputs[i].name  === 'email' || inputs[i].name === 'age') {
                    divMessage.html('Please enter an ' + inputs[i].name + ' to continue.').removeClass('hidden'); // proper Engrish is a must
                } else {
                    divMessage.html('Please enter a ' + inputs[i].name + ' to continue.').removeClass('hidden');
                }

                $(inputs[i]).focus().parent().addClass('has-error');
                return;
            } else {
                values[inputs[i].name] = inputs[i].value; // put POST values into container obj
            }
        }
        if (document.getElementById('radFemale').checked){
            values.gender = 'F';
        }
        this.model.set(values); // correct way to set model values

        this.model.save(null, {
            success: function(){
                divMessage.html('New User successfully created.').removeClass('hidden');
                for (var i = 0, l = inputs.length; i < l; i++) {
                    inputs[i].value = ''; // reset the input fields
                }
            },
            error: function(){
                divMessage.html('There was an error creating this new user. Please try again').removeClass('hidden');
            }
        });

    }
});
