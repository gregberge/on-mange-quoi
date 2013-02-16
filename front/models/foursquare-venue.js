define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    urlRoot: '/api/foursquare-venue'
  });
});