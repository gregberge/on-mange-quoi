define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: '/api/poll',

    defaults: {}
  });
});