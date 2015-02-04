var Backbone = require('backbone'),
    templates = require('../templates'),
    UserModel = require('../models/user'),
    UserCollection = require('../models/users');

module.exports = Backbone.View.extend({

    el: $('#content'),

    model: UserModel,

    events: {
        'change #selField': 'queryFields',
        'change #selValue': 'filterCollection',
        'click #btnFilter': 'filterCollection'
    },

    collection: new UserCollection(),

    initialize: function(){
        var self = this;
        this.template = templates.users;
        this.collection.fetch({
            success: function(data){
                for (var i = 0, l = data.models.length; i < l; i++){ // set a showing prop on all models
                    data.models[i].showing = true;
                }
                self.render(); // only render this view after the data is fetched
            }
        });
    },

    render: function(){
        this.$el.html(this.template({models: this.collection.models}));
        return this;
    },

    queryFields: function(){
        var selField = this.$('#selField');
        var selValue = this.$('#selValue');
        var optFirst = selField.find('option:first-child');
        if (optFirst.val() === 'null'){
            optFirst.remove();
        }

        selValue.html('');
        var fields = this.collection.pluck(selField.val());
        var arrUnique = function(a) { // get unique values from the avaliable data
            return a.reduce(function(p, c) {
                if (p.indexOf(c) < 0) p.push(c);
                return p;
            }, []);
        };
        fields = arrUnique(fields);
        for (var i = 0, l = fields.length; i < l; i++){
            var option = document.createElement('option');
            option.value = fields[i];
            option.text = fields[i];
            selValue.append(option);
        }
    },

    filterCollection: function(){
        var selField = this.$('#selField');
        var selValue = this.$('#selValue');
        for (var i = 0, l = this.collection.models.length; i < l; i++){
            if (this.collection.models[i].attributes[selField.val()] !== selValue.val()){
                this.collection.models[i].showing = false;
            } else {
                this.collection.models[i].showing = true;
            }
        }
        this.render();
    }
});
