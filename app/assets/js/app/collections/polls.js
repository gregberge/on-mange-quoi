define(['backbone', 'js/models/poll'],
  function (Backbone, Poll) {
    return Backbone.Collection.extend({
      model: Poll,
      url: '/api/poll'
    });
  });