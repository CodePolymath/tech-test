var Backbone = require('backbone'),
    templates = require('../templates'),
    UserModel = require('../models/user');

module.exports = Backbone.Collection.extend({
    model: UserModel,

    url: '/api/users'
});
